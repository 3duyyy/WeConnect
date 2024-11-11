import { ImageUploader } from "@components/PostCreation";
import {
  Avatar,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  TextareaAutosize,
} from "@mui/material";
import { closeDialog } from "@redux/slices/dialogSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useCreatePostMutation } from "@services/rootApi";
import { useState } from "react";
import { useDispatch } from "react-redux";

const NEW_POST_DIALOG = ({ userInfo }) => {
  const [createNewPost, { data = {}, isSuccess, isLoading }] = useCreatePostMutation();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const handleCreatNewPost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", image);

      await createNewPost(formData).unwrap();
      dispatch(closeDialog());
      dispatch(openSnackbar({ message: "Create Post Successfully" }));
    } catch (error) {
      dispatch(openSnackbar({ type: "error", message: error?.data.message }));
    }
  };

  const isValid = !!(content || image);

  return (
    <div>
      <DialogContent>
        <div className="flex items-center gap-2">
          <Avatar className="!bg-primary-main" sx={{ width: "32px", height: "32px" }}>
            {userInfo.fullName?.[0].toUpperCase()}
          </Avatar>
          <p className="text-[1.2vw] font-bold">{userInfo.fullName}</p>
        </div>
        <TextareaAutosize
          minRows={3}
          placeholder="What's on your mind?"
          className="mt-4 w-full border-2 p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ImageUploader image={image} setImage={setImage} />
      </DialogContent>
      <DialogActions className="!px-6 !py-5 !pt-0">
        <Button fullWidth variant="contained" disabled={!isValid} onClick={handleCreatNewPost}>
          {isLoading ? <CircularProgress size="24px" /> : "Post"}
        </Button>
      </DialogActions>
    </div>
  );
};

export default NEW_POST_DIALOG;
