"use client";

import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

import { RectButton } from "@/components/buttons/RectButton";
import { BorderTitle } from "@/components/headers/BorderTitle";

function Media() {
  return (
    <>
      <CardHeader
        avatar={
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            animation="wave"
            variant="rounded"
            width={50}
            height={50}
          />
        }
        title={
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            animation="wave"
            height={20}
            width="50%"
            style={{ marginBottom: 10 }}
          />
        }
        subheader={
          <Skeleton sx={{ bgcolor: "grey.400" }} animation="wave" height={20} width={200} />
        }
      />

      <CardHeader
        avatar={
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            animation="wave"
            variant="rounded"
            width={50}
            height={50}
          />
        }
        title={
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            animation="wave"
            height={20}
            width="50%"
            style={{ marginBottom: 10 }}
          />
        }
        subheader={
          <Skeleton sx={{ bgcolor: "grey.400" }} animation="wave" height={20} width={200} />
        }
      />

      <CardHeader
        avatar={
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            animation="wave"
            variant="rounded"
            width={50}
            height={50}
          />
        }
        title={
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            animation="wave"
            height={20}
            width="50%"
            style={{ marginBottom: 10 }}
          />
        }
        subheader={
          <Skeleton sx={{ bgcolor: "grey.400" }} animation="wave" height={20} width={200} />
        }
      />
    </>
  );
}

export default function LoadingPage() {
  const onClick = () => {
    console.log("click");
  };

  return (
    <div className="container grid gap-5 ">
      <div className="m-5 flex items-center justify-center text-center">
        <BorderTitle title="あなたの候補をもとに検索しています" />
      </div>
      <div className="m-5 ">
        <Media />
      </div>
      <div className="flex items-center justify-center">
        <RectButton text="キャンセル" color="red" onClick={onClick} />
      </div>
    </div>
  );
}
