import { useHotkeys } from 'react-hotkeys-hook';
import TextBox from './text-box';
import { Button } from '@/components/ui/button';
import { usePlatform } from '@/hooks/use-platform';
import { AnyFormApi, useForm } from '@tanstack/react-form';
import { useRef, useState } from 'react';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { cn } from '@/lib/utils';
import z from 'zod';
import { Paperclip } from 'lucide-react';
import { usePrefersDark } from '@/lib/use-prefers-color-scheme';

export const chatInputSchema = z.object({
  prompt: z.string(),
  attachments: z.record(
    z.string(),
    z.custom<File>((v) => v instanceof File)
  ),
});

export type ChatInputType = z.infer<typeof chatInputSchema>;

export interface ChatInputProps {
  onSubmit?: (props: { value: ChatInputType; formApi: AnyFormApi }) => void;
  history?: ChatInputType[];
}

export default function ChatInput(props: ChatInputProps) {
  const platform = usePlatform();
  const isMobile = platform === 'android' || platform === 'ios';
  const isMac = platform === 'macos';

  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const form = useForm({
    defaultValues: {
      prompt: '',
      attachments: {} as Record<string, File>,
    },
    validators: {
      onSubmit: chatInputSchema,
    },
    onSubmit: props.onSubmit,
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const addFiles = (files: FileList) => {
    const newFiles = Array.from(files).reduce(
      (prev, curr) => {
        prev[curr.name] = curr;
        return prev;
      },
      {} as Record<string, File>
    );

    const currentFiles = form.getFieldValue('attachments');
    form.setFieldValue('attachments', { ...currentFiles, ...newFiles });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const openFilePicker = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  useHotkeys(
    ['meta+u', 'ctrl+u'],
    () => {
      openFilePicker();
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      preventDefault: true,
    }
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    addFiles(e.currentTarget.files);
    e.target.value = '';
  };

  useHotkeys(
    ['meta+enter', 'ctrl+enter'],
    () => {
      if (submitButtonRef.current == null) return;
      submitButtonRef.current.click();
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
      preventDefault: true,
    }
  );

  const prefersDark = usePrefersDark();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex w-full max-w-4xl flex-col border border-input bg-transparent text-base ring-offset-background outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:outline-none',
        isDragging && 'border-primary ring-2 ring-primary ring-offset-2'
      )}
    >
      <div
        hidden={!isDragging}
        aria-hidden={true}
        className={cn(
          'absolute inset-0 flex items-center justify-center bg-white/50 p-4 text-center',
          !isDragging && 'pointer-events-none'
        )}
      >
        Drop files here
      </div>

      <form.Subscribe
        selector={(state) => state.values.attachments}
        children={(attachments) => (
          <Files
            attachments={attachments}
            onRemove={(name) => {
              const current = form.getFieldValue('attachments');
              const newAtt = { ...current };
              delete newAtt[name];
              form.setFieldValue('attachments', newAtt);
            }}
          />
        )}
      />

      <form.Field
        name="prompt"
        children={(field) => (
          <div className="w-full space-y-0">
            <TextBox
              value={field.state.value}
              onChange={(val) => field.handleChange(val)}
              onBlur={field.handleBlur}
              maxHeight="16rem"
              minHeight="4rem"
              onBoundaryExtensionTop={() => console.log('top')}
              onBoundaryExtensionBottom={() => console.log('bottom')}
              className="w-full"
              autoFocus={true}
              placeholder="Describe your diagram"
            />
            {field.state.meta.errors ? (
              <div className="text-sm text-destructive" role="alert">
                {field.state.meta.errors.join(', ')}
              </div>
            ) : null}
          </div>
        )}
      />

      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      <div className="flex justify-between border-t">
        <Button
          type="button"
          aria-label="Add images and files"
          title="Add images and files"
          variant={'ghost'}
          onClick={openFilePicker}
        >
          <Paperclip />
          {!isMobile && (
            <KbdGroup>
              <Kbd>{isMac ? '⌘' : 'ctrl'}</Kbd>
              <Kbd>U</Kbd>
            </KbdGroup>
          )}
        </Button>

        <Button ref={submitButtonRef} type="submit" className="gap-2">
          send
          {!isMobile && (
            <KbdGroup className={prefersDark ? 'light' : 'dark'}>
              <Kbd>{isMac ? '⌘' : 'ctrl'}</Kbd>
              <Kbd>⏎</Kbd>
            </KbdGroup>
          )}
        </Button>
      </div>
    </form>
  );
}

function Files({
  attachments,
  onRemove,
}: {
  attachments: Record<string, File>;
  onRemove: (name: string) => void;
}) {
  return (
    <>
      {Object.keys(attachments).length > 0 && (
        <div className="flex flex-wrap gap-2 border-b px-3 py-2">
          {Object.values(attachments).map((file) => (
            <button
              key={file.name}
              type="button"
              onClick={() => onRemove(file.name)}
              className="group flex bg-foreground text-background md:text-sm"
              title={`Remove ${file.name}`}
              aria-label={`Remove ${file.name}`}
            >
              <div className="max-w-40 overflow-clip text-ellipsis whitespace-nowrap group-hover:line-through">
                {file.name}
              </div>
              <div className="px-1">❌</div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
