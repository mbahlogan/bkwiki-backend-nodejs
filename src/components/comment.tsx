import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "./ui/typography";
import { Ellipsis, Heart, Link, Mail, Menu, MessageSquare, Share, ThumbsUp } from "lucide-react";
import Rating from "./rating";
import Description from "./description";
import { FaRegShareSquare } from "react-icons/fa";

export default function Comment() {
  return (
    <div className="border border-gray-300">
      <div className="p-4 flex justify-between w-full items-start">
        <div className="flex gap-4 flex-1">
          <Avatar className="w-20 h-20">
            <AvatarImage src={""} />
            <AvatarFallback className="uppercase bg-primary text-white text-4xl">
              DM
            </AvatarFallback>
          </Avatar>

          <div>
            <Typography variant="title">Danie Mbi</Typography>

            <Typography variant="paragraph">
              Systems Engineer, Javascript, PHP, Html5, css, Ajax, MySql,
              Laravel, React. Computer Software Small-Business(50 or fewer emp.)
            </Typography>
          </div>
        </div>

        <div className="flex-1 flex gap-4 justify-end">
          <button>
            <Mail size="20px" strokeWidth="2px" />
          </button>
          <button>
            <Link size="20px" strokeWidth="2px" />
          </button>
          <button>
            <Ellipsis size="20px" strokeWidth="2px" />
          </button>
        </div>
      </div>

      <div className="p-5 border-y border-gray-300">
        <div className="flex gap-2 items-center">
          <Rating value={5} />

          <Typography variant="paragraph">Mar 25, 2024</Typography>
        </div>

        <div className="space-y-5 pt-4">
          <Typography size="mid">"Excellent tool for teamwork"</Typography>
          <Description title="What do you like best about Trello?">
            Trello is an excellent tool for teamwork, it allows you to keep
            track of the tasks and activities that each staff is carrying out.
            raise supports, generalize roles, and have better organization
            within the work area. The collaboration of the projects is all done
            in real time, allowing us to be up to date when making some changes.
            It has a mobile application, which today is an option that should
            not be missing in any system.
          </Description>

          <Description title="What do you dislike about Trello?">
            As a disadvantage, it can be said that it is dependent on the
            internet, it cannot be used locally without the internet. For
            projects that are very large, it can be a little difficult to use,
            since its card system, being very large projects, is limited and
            cannot be understood. It could have more integrations with more
            tools that help provide it with more resources to carry out the
            activities. The interface could be improved or have more
            customization, although if it has customization options, more
            functionalities could be added.
          </Description>
        </div>
      </div>

      <div className="p-4 flex gap-16 justify-center">
        <IconButton icon={<ThumbsUp size="16px" strokeWidth="3px" />}>
          Helpful?
        </IconButton>
        <IconButton icon={<MessageSquare size="16px" strokeWidth="3px" />}>
          Add Comment
        </IconButton>
        <IconButton icon={<FaRegShareSquare size="16px" strokeWidth="3px" />}>
          Share
        </IconButton>
        <IconButton icon={<Heart size="16px" strokeWidth="3px" color="red" />}>
          Save this Review
        </IconButton>
      </div>
    </div>
  );
}

const IconButton = ({ icon, children }: { icon: any; children: any }) => {
  const Icon = () => icon
  return <button className="flex gap-2 items-center">
    <Icon />
    <Typography size="sm">
    {children}
    </Typography>
  </button>;
};
