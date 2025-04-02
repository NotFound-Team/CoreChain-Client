"use client"

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, AvatarGroup, Badge, BadgeProps, styled } from "@mui/material";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: 20,
    top: 10,
    padding: '0 4px',
  },
}));

export default function Project() {
  return (
    <>
      <div>
        <h2 className="font-bold text-2xl">List Project</h2>
      </div>
      <ul className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5].map((item, index) => (
          <li key={index} className="w-[">
            <StyledBadge badgeContent={"Working"} color="primary">
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image="https://www.shutterstock.com/image-vector/this-cat-pixel-art-colorful-260nw-2346901397.jpg"
                  sx={{ height: 120, objectFit: "contain" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                  </AvatarGroup>
                  <Button size="small">Details</Button>
                </CardActions>
              </Card>
            </StyledBadge>
          </li>
        ))}
      </ul>
    </>
  );
}
