import { AlertColor } from "@mui/material";
import { Post } from "../Post";
import { Profile } from "../Profile";

export interface AlertProps {
   title?: string;
   message: string;
   mode?: AlertColor;
}

export interface HeadingNewsProps {
   status?: string;
   news: Post;
   author: Profile;
   createdAt: string;
   indexNews?: number;
   showAction?: boolean;
}

export interface ModalRef {
   handleOpen: () => void;
   handleClose: () => void;
   images: string[];
   post: string;
   status: string;
   setImages: any;
   setPost: any;
   setStatus: any;
}
