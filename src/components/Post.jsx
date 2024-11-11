import { Comment, ThumbUp } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import dayjs from "dayjs";

const Post = ({ fullName = "", createdAt, content = "", image, likes = [], comments = [] }) => {
  return (
    <div className="card">
      <div className="mb-3 flex gap-3">
        <Avatar className="!bg-primary-main" sx={{ width: "32px", height: "32px" }}>
          {fullName?.[0]?.toUpperCase()}
        </Avatar>

        <div>
          <p className="text-[1.2vw] font-bold">{fullName}</p>
          <p className="text-sm text-[#909090]">{dayjs(createdAt).format("DD/MM/YYYY HH:mm")}</p>
        </div>
      </div>

      <p className="mb-2">{content}</p>
      {image && <img src={image} />}

      <div className="my-4 flex justify-between">
        <div className="flex items-center gap-1 text-sm">
          <ThumbUp fontSize="small" className="text-primary-main" />
          <p>{likes.length}</p>
        </div>
        <div>
          <p className="text-sm">{comments.length} comments</p>
        </div>
      </div>

      <div className="border-dark-300 flex border-y py-2">
        <Button size="small" className="flex-1 !text-dark-100">
          <ThumbUp fontSize="small" className="mr-1" />
          Like
        </Button>
        <Button size="small" className="flex-1 !text-dark-100">
          <Comment fontSize="small" className="mr-1" /> Comment
        </Button>
      </div>
    </div>
  );
};

export default Post;
