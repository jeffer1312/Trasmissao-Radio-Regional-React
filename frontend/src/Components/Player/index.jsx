import React, { useState, useEffect, Fragment } from "react";

import ReactPlayer from "react-player";
import "./styles.css";
import { PlayerWrapper, LocalPlay } from "./style";
export default function Player() {
  const Urls = [
    "http://191.37.227.127:5000/stream.aac",
    "http://192.168.88.110:9000/stream.aac"
  ];

  const [streams, setStreams] = useState();
  const [play, setPlay] = useState();
  const [stop, setStop] = useState();
  const [type, setType] = useState();
  const [buffer, setBuffer] = useState();

  function handlePlay() {
    setPlay(true);
    setStop(false);

    console.log(`Esta Tocando do ${streams}`);
  }

  function handlePause() {
    setPlay(false);
    setStop(true);
  }

  function player() {
    return (
      <PlayerWrapper>
        <LocalPlay>Esta Tocando {Nome()}</LocalPlay>
        <ReactPlayer
          className="react-player"
          onPlay={handlePlay}
          onPause={handlePause}
          controls={true}
          url={streams}
          playing
          volume={1}
          onBuffer={handleBuffer}
          width="80%"
          height="83vh"
        />
      </PlayerWrapper>
    );
  }
  useEffect(() => {
    async function GetData() {
      try {
        await fetch(Urls[0]).then(res => {
          if (res.status === 200 && res.ok === true) {
            setStreams(res.url);
          } else if (res.status === 404 && res.ok === false) {
            fetch(Urls[1]).then(res1 => {
              if (res1.status === 200 && res1.ok === true) {
                setStreams(res1.url);
              } else if (res1.status === 404 && res1.ok === false) {
                return window.location.reload();
              }
            });
          } else {
          }
        });
      } catch (error) {
        if (error.toString() === "TypeError: Failed to fetch") {
          return window.location.reload();
        }
      }
    }
    GetData();
  }, [streams, Urls]);
  useEffect(() => {
    if (stop === true && play === false) {
      return window.location.reload();
    }
  }, [stop, play]);

  const Nome = () => {
    if (streams === "http://170.81.93.32:9000/stream.aac") {
      return "Da Torre";
    } else if (streams === "http://191.37.227.127:5000/stream.aac") {
      return "Do Studio";
    }
  };

  const handleBuffer = buffer => {
    console.log(buffer);
    setBuffer(buffer);
    setType(buffer.type);
  };
  useEffect(() => {
    console.log(buffer);
    if (type === "waiting") {
      // return window.location.reload();
    }
  }, [type, buffer]);
  return <Fragment>{player()}</Fragment>;
}
