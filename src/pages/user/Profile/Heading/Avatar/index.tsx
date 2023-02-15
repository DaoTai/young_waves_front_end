import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../../../redux-saga/redux/actions";
import { profileState$ } from "../../../../../redux-saga/redux/selectors";
import { Image, ImageInput, Spinner } from "../../../../../components";
import { WrapAvatar } from "../styles";
import { useSelector } from "react-redux";

const Avatar = ({ image, ...props }: { image: string; props?: any }) => {
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(profileState$);
   const imageRef = useRef(Object(null));
   const handleChange = (file) => {
      imageRef.current.src = file;
      dispatch(updateProfile({ avatar: file, _id: Object(payload?.data)._id }));
   };
   return (
      <>
         <WrapAvatar>
            <Image ref={imageRef} src={image} circle srcSet={image} alt="avatar" />
            <ImageInput onChange={handleChange} />
         </WrapAvatar>
         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default Avatar;
