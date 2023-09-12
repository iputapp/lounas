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
            sx={{ bgcolor: "grey.500" }}
            animation="wave"
            variant="rounded"
            width={30}
            height={30}
          />
        }
        title={
          <Skeleton
            sx={{ bgcolor: "grey.500" }}
            animation="wave"
            height={10}
            width="20%"
            style={{ marginBottom: 5 }}
          />
        }
        subheader={
          <Skeleton sx={{ bgcolor: "grey.500" }} animation="wave" height={10} width={100} />
        }
      />

      <CardHeader
        avatar={
          <Skeleton
            sx={{ bgcolor: "grey.500" }}
            animation="wave"
            variant="rounded"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            sx={{ bgcolor: "grey.500" }}
            animation="wave"
            height={15}
            width="40%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={
          <Skeleton sx={{ bgcolor: "grey.500" }} animation="wave" height={15} width={150} />
        }
      />

      <CardHeader
        avatar={
          <Skeleton
            sx={{ bgcolor: "grey.500" }}
            animation="wave"
            variant="rounded"
            width={50}
            height={50}
          />
        }
        title={
          <Skeleton
            sx={{ bgcolor: "grey.500" }}
            animation="wave"
            height={20}
            width="50%"
            style={{ marginBottom: 10 }}
          />
        }
        subheader={
          <Skeleton sx={{ bgcolor: "grey.500" }} animation="wave" height={20} width={200} />
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
    <div className="container grid h-screen items-center justify-center">
      <div className="mx-3 flex items-center justify-center text-center">
        <BorderTitle title="あなたの候補をもとに検索しています" />
      </div>
      <div className="m-5 flex  flex-col items-center">
        <Media />
      </div>
      <div className="m-5 flex items-center justify-center">
        <RectButton text="キャンセル" color="red" onClick={onClick} />
      </div>
    </div>
  );
}
