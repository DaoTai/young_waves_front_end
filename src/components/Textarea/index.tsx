import { TextareaAutosize, TextareaAutosizeProps, useTheme } from "@mui/material";
import { ChangeEvent, KeyboardEvent, memo, useRef } from "react";

interface Props extends TextareaAutosizeProps {
   value: string;
   placeholder: string;
   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
   onEnter: () => void;
}

const Textarea = ({
   value,
   placeholder = "Type a message ...",
   onChange,
   onEnter,
   ...restProps
}: Props) => {
   const theme = useTheme();
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   // Short hand type message
   const onShortHand = (e: KeyboardEvent) => {
      if (e.shiftKey && e.keyCode === 13) {
         e.preventDefault(); // Ngăn chặn xuống dòng tự động

         const cursorPosition = textareaRef?.current?.selectionStart as number; // Đọc vị trí con trỏ hiện tại
         textareaRef!.current!.value =
            textareaRef?.current?.value.substring(0, cursorPosition) +
            "\n" +
            textareaRef?.current?.value.substring(cursorPosition); // Thêm dòng mới vào vị trí con trỏ
         textareaRef?.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1); // Đặt lại vị trí con trỏ
         return;
      }
      if (e.key === "Enter") {
         onEnter();
      }
   };
   return (
      <TextareaAutosize
         {...restProps}
         style={{ background: theme.palette.background.default, color: theme.palette.text.primary }}
         autoFocus
         spellCheck={false}
         ref={textareaRef}
         value={value}
         placeholder={placeholder}
         onChange={onChange}
         onKeyDown={onShortHand}
      />
   );
};

export default memo(Textarea);
