import { Avatar, Box, Button, Container } from "@mui/material";
import React, { useRef, useState } from "react";
import { addReview } from "../api/reviews";
import { stringAvatar } from "../utils/stringMods";


/**
 * Kommentin syöttöruutu
 */
export default function CommentBox(props){
    const { user, book, author } = props

    const [comment, setComment] = useState("")
    const textRef = useRef(null)
    const containerRef = useRef(null)


    React.useEffect(() => {
      // dynamic textarea height  
      textRef.current.style.height = "auto"
      textRef.current.style.height = textRef.current.scrollHeight + "px"
    }, [textRef, comment])



    const onExpand = () => {}

    const onChange = (e) => {
      const value = e.target.value
        if(value.length <= 280){
          setComment(value)
        }
    }

    const onClose = () => {
        setComment("")
    }

    const onSubmit = (e) => {
        e.preventDefault()

        addReview({user, book, comment}).then((res) => {
            const {data} = res
            if(data){
                onClose()
                props.toast("success", data.message)
            }else{
                props.toast("warning", res.err.message)
            }
        })
    }


    return (
        <Container>
            <form
                onSubmit={onSubmit}
                ref={containerRef}
                style={{
                    minHeight: 46,
                    display: "flex",
                    flexWrap: "wrap",
                    maxWidth: "900px",                    //maxWidth: "400px",
                    //margin: "50px auto",
                    background: "white",
                    borderRadius: "4px",
                    overflow: "hidden",
                    //boxShadow: "0 0 8px rgba(0,0,0, 0.2)",
                    padding: "14px",
                    transition: "min-height 0.4s ease",
                    maxHeight: "unset"
                }}
                >

                    <Box className="header" sx={{ transition: "opacity 0.4s ease 0.2s"}}>
                        <Box className="user" sx={{  display: "flex", alignItems: "center"  }}>
                            <Avatar {...stringAvatar( author, { borderRadius: "20px", marginRight: "10px"})} />
                            <span>{ author }</span>
                        </Box>
                    </Box>

                    <label style={{
                      height: 0,
                      width: 0,
                      visibility: "hidden"
                    }} htmlFor="comment">Write a review...</label>
                    <textarea
                        ref={textRef}
                        onClick={onExpand}
                        onFocus={onExpand}
                        onChange={onChange}
                        className="comment-field"
                        placeholder="Write a review..."
                        value={comment}
                        name="comment"
                        id="comment"
                        style={{
                          paddingTop: "25px",
                          border:"none",
                          resize: "none",
                          transition: "transform 0.4s ease",
                          fontSize: "18px",
                          width: "100%",
                          outline: "none",
                          minHeight: "60px",
                          lineHeight: 1
                      }}
                    />

                    <Box className="actions" sx={{
                      width: "100%",
                      display: "flex",
                      alignSelf: "flex-end",
                      justifyContent: "flex-end",
                      mt: 1,
                      opacity: 1,
                      transition: "opacity 0.4s ease 0.2s",
                      "& Button": {
                        marginLeft: "6px",
                        fontSize: "14px",
                        padding: "12px",
                        lineHeight: 1
                      },
                      "& .cancel": {
                        background: "none"
                      },
                      '& button[type="submit"]': {
                          background: "green",
                          color: "white",
                          borderRadius: 1
                      },
                      '& button:disabled' : {
                        opacity: 0.5,
                        background: "none",
                        color: "gray"
                      }
                      
                    }}>
                        <Button disabled sx={{flex: "auto", justifyContent: "flex-start", alignSelf: "flex-start"}}>
                          {280 - comment.length}
                        </Button>
                        <Button type="button" className="cancel" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={comment.length < 1}>
                            Send
                        </Button>
                    </Box>
                </form>
        </Container>
    );

}