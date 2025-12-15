import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  SyntheticEvent,
  ChangeEvent,
  type Ref,
} from 'react';
import { ReactCodeMirrorRef, ViewUpdate } from '@uiw/react-codemirror';
import { cn } from '@/lib/utils';
import { CodeMirrorMarkdownProps } from './codemirror-markdown';
import CodeMirrorMarkdown from './codemirror-markdown';
import { ClientOnly } from '@tanstack/react-router';

export type TextBoxSelection = { start: number; end: number };

export interface TextBoxProps extends Omit<
  CodeMirrorMarkdownProps,
  'onChange'
> {
  onChange?: (val: string, view?: ViewUpdate) => void;
}

const TextBox = ({
  value,
  onChange,
  ref,
  ...props
}: TextBoxProps & { ref?: Ref<ReactCodeMirrorRef> }) => {
  const textAreaId = useId();
  const textArea = useRef<HTMLTextAreaElement | null>(null);

  const defaultValue = value ?? '';

  const [internalSelection, setInternalSelection] = useState<TextBoxSelection>({
    start: 0,
    end: 0,
  });

  useLayoutEffect(() => {
    const el = textArea.current;
    if (!el) return;
    const domValue = el.value ?? defaultValue;

    setInternalSelection({
      start: el.selectionStart,
      end: el.selectionEnd,
    });
    if (onChange) {
      onChange(domValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = textArea.current;
    if (!el) return;
    if (document.activeElement === el) {
      el.setSelectionRange(internalSelection.start, internalSelection.end);
    }
  }, [internalSelection]);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.currentTarget.value);
    }
  };

  const handleSelection = (e: SyntheticEvent<HTMLTextAreaElement, Event>) => {
    setInternalSelection({
      start: e.currentTarget.selectionStart,
      end: e.currentTarget.selectionEnd,
    });
  };

  return (
    <ClientOnly
      fallback={
        <textarea
          ref={textArea}
          id={textAreaId}
          value={value}
          className={cn(
            'block field-sizing-content border-none px-3 py-2 font-mono text-base outline-none placeholder:text-muted-foreground md:text-sm',
            props.className
          )}
          autoFocus={props.autoFocus}
          style={{
            height: props.height,
            minHeight: props.minHeight,
            maxHeight: props.maxHeight,
            width: props.width,
            maxWidth: props.maxWidth,
            resize: 'none',
          }}
          placeholder={`${props.placeholder}`}
          readOnly={props.readOnly}
          onChange={handleTextAreaChange}
          onSelect={handleSelection}
        />
      }
    >
      <CodeMirrorMarkdown
        {...props}
        onChange={onChange}
        value={value}
        ref={ref}
        selection={{
          anchor: internalSelection.start,
          head: internalSelection.end,
        }}
      />
    </ClientOnly>
  );
};

export default TextBox;
