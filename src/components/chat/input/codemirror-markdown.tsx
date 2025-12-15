import CodeMirror, {
  EditorSelection,
  ReactCodeMirrorProps,
  ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from '@codemirror/lang-markdown';
import {
  keymap,
  highlightSpecialChars,
  drawSelection,
  EditorView,
  KeyBinding,
  ViewUpdate,
} from '@codemirror/view';
import {
  bracketMatching,
  defaultHighlightStyle,
  syntaxHighlighting,
} from '@codemirror/language';
import {
  addCursorAbove,
  addCursorBelow,
  copyLineDown,
  copyLineUp,
  cursorMatchingBracket,
  cursorSyntaxLeft,
  cursorSyntaxRight,
  deleteLine,
  history,
  historyKeymap,
  indentLess,
  indentMore,
  indentSelection,
  moveLineDown,
  moveLineUp,
  selectLine,
  selectParentSyntax,
  selectSyntaxLeft,
  selectSyntaxRight,
  simplifySelection,
  toggleBlockComment,
  toggleComment,
  toggleTabFocusMode,
} from '@codemirror/commands';
import {
  CloseBracketConfig,
  closeBrackets,
  closeBracketsKeymap,
} from '@/lib/close-brackets-codemirror';
import { useCallback, useEffect, useRef, type Ref } from 'react';

const defaultKeymap: readonly KeyBinding[] = [
  {
    key: 'Alt-ArrowLeft',
    mac: 'Ctrl-ArrowLeft',
    run: cursorSyntaxLeft,
    shift: selectSyntaxLeft,
  },
  {
    key: 'Alt-ArrowRight',
    mac: 'Ctrl-ArrowRight',
    run: cursorSyntaxRight,
    shift: selectSyntaxRight,
  },

  { key: 'Alt-ArrowUp', run: moveLineUp },
  { key: 'Shift-Alt-ArrowUp', run: copyLineUp },

  { key: 'Alt-ArrowDown', run: moveLineDown },
  { key: 'Shift-Alt-ArrowDown', run: copyLineDown },

  { key: 'Mod-Alt-ArrowUp', run: addCursorAbove },
  { key: 'Mod-Alt-ArrowDown', run: addCursorBelow },

  { key: 'Escape', run: simplifySelection },

  { key: 'Alt-l', mac: 'Ctrl-l', run: selectLine },
  { key: 'Mod-i', run: selectParentSyntax, preventDefault: true },

  { key: 'Mod-[', run: indentLess },
  { key: 'Mod-]', run: indentMore },
  { key: 'Mod-Alt-\\', run: indentSelection },
  { key: 'Shift-Mod-k', run: deleteLine },
  { key: 'Shift-Mod-\\', run: cursorMatchingBracket },

  { key: 'Mod-/', run: toggleComment },
  { key: 'Alt-A', run: toggleBlockComment },

  { key: 'Ctrl-m', mac: 'Shift-Alt-m', run: toggleTabFocusMode },
];

export interface CodeMirrorMarkdownProps extends Omit<
  ReactCodeMirrorProps,
  'extensions' | 'basicSetup' | 'theme' | 'onSelect'
> {
  onSelect?: (selection: EditorSelection) => void;
  onBoundaryExtensionTop?: () => void;
  onBoundaryExtensionBottom?: () => void;
}

const CodeMirrorMarkdown = ({
  onSelect,
  onBoundaryExtensionBottom,
  onBoundaryExtensionTop,
  ref,
  ...props
}: CodeMirrorMarkdownProps & { ref?: Ref<ReactCodeMirrorRef> }) => {
  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (vu.selectionSet && onSelect) {
      onSelect(vu.state.selection);
    }
  });

  const boundaryExtension = useCallback(() => {
    return keymap.of([
      {
        key: 'ArrowUp',
        run: (view) => {
          if (onBoundaryExtensionTop === undefined) return false;

          const { state } = view;
          const doc = state.doc;
          const selection = state.selection.main;

          const currentLine = doc.lineAt(selection.head).number;

          if (currentLine === 1) {
            onBoundaryExtensionTop();
            return true;
          }

          return false;
        },
      },
      {
        key: 'ArrowDown',
        run: (view) => {
          if (onBoundaryExtensionBottom === undefined) return false;

          const { state } = view;
          const doc = state.doc;
          const selection = state.selection.main;

          const currentLine = doc.lineAt(selection.head).number;
          const totalLines = doc.lines;

          if (currentLine === totalLines) {
            onBoundaryExtensionBottom();
            return true;
          }

          return false;
        },
      },
    ]);
  }, [onBoundaryExtensionBottom, onBoundaryExtensionTop]);

  const internalRef = useRef<ReactCodeMirrorRef>(null);

  const dropHandler = EditorView.domEventHandlers({
    drop(event) {
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        event.preventDefault();
        return true;
      }
      return false;
    },
    dragover(event) {
      if (event.dataTransfer && event.dataTransfer.types.includes('Files')) {
        event.preventDefault();
        return true;
      }
      return false;
    },
  });

  // changes to props.value are sometimes laggy. this fixes that
  useEffect(() => {
    if (internalRef.current === null || internalRef.current.view === undefined)
      return;
    if ((props.value ?? '') === internalRef.current.view.state.doc.toString())
      return;

    internalRef.current.view.dispatch({
      changes: {
        from: 0,
        to: internalRef.current.view.state.doc.length,
        insert: props.value ?? '',
      },
    });
  }, [props.value]);

  return (
    <CodeMirror
      {...props}
      ref={(current) => {
        internalRef.current = current;
        if (typeof ref === 'function') {
          ref(current);
        } else if (ref) {
          // @ts-ignore
          ref.current = current;
        }
      }}
      theme={'none'}
      basicSetup={false}
      indentWithTab={false}
      extensions={[
        boundaryExtension(),
        dropHandler,
        updateListener,
        highlightSpecialChars(),
        history(),
        drawSelection(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        markdown(),
        EditorView.lineWrapping,
        markdownLanguage.data.of({
          closeBrackets: {
            brackets: ['(', '[', '{', "'", '"', '`', '*', '_', '$'],
            before: ')]}:;>*_$',
          } satisfies CloseBracketConfig,
        }),
        EditorView.contentAttributes.of({
          spellcheck: 'true',
          autocorrect: 'on',
          autocapitalize: 'sentences',
          writingsuggestions: 'true',
        }),
        EditorView.theme({
          '.cm-scroller': { overflow: 'auto' },
        }),
        keymap.of([
          ...markdownKeymap,
          ...defaultKeymap,
          ...historyKeymap,
          ...closeBracketsKeymap,
        ]),
      ]}
    />
  );
};

export default CodeMirrorMarkdown;
