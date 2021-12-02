import React, { ReactElement } from "react";
import Theme from "../styles/Theme.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter } from 'next/router'

interface Props {}

export default function index({}: Props): ReactElement {
  const router = useRouter()
  const dateV1 = () => {
      router.push({
       pathname: '/dateV1'
     })
   }

   const dateV2 = () => {
    router.push({
     pathname: '/dateV2'
   })
 }

  return (
    <div className={Theme.center}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={dateV1}>
          date V1
        </Button>
        <Button variant="contained"  onClick={dateV2}>
          date V2
        </Button>
      </Stack>
    </div>
  );
}
