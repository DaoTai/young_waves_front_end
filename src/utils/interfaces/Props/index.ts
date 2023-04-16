import { AlertColor } from "@mui/material";
import { Post } from "../Post";
import { Profile } from "../Profile";

export interface AlertProps {
   title?: string;
   message: string;
   mode?: AlertColor;
   onClose?: () => void;
}

export interface HeadingNewsProps {
   status?: string;
   post: Post;
   author: Profile;
   createdAt: string;
   indexNews?: number;
   showAction?: boolean;
}

export interface ModalRef {
   handleOpen: () => void;
   handleClose: () => void;
   images: string[];
   body: string;
   status: string;
   setImages: (value: string | string[]) => void;
   setPost: (value: string) => void;
   setStatus: (value: string | undefined) => void;
}
