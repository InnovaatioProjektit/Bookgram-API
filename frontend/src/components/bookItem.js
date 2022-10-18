import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const bookItem = {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "heh"
}

/**
 * Kirjan kansikortti.
 */
export default (props) => {
    const {uid, id, data} = props;

    const navigate = useNavigate()
    const link = "/book/details/" + data.tag;


    return (
        <Card sx={{ minWidth: 230, maxWidth: "25%" }}>
        <CardActionArea onClick={() => {
            navigate(link)
        }}>
            <CardMedia
            component="img"
            height="300"
            image="https://images.unsplash.com/photo-1530731141654-5993c3016c77?w=512&fit=crop&auto=format"
            alt="green iguana"
            />
            <CardContent sx={{
               minHeight: 114
            }}>
            <Typography  align="center" gutterBottom variant="subtitle1" component="div">
                {data.title}
            </Typography>
            <Typography align="center" variant="body2" color="text.secondary">
                By {data.author}
            </Typography>
            </CardContent>
        </CardActionArea>
        {uid ? (
            <CardActions>
                <Button size="small" color="primary" onClick={() => {

                }}>
                Quick Add
                </Button>
                <Button size="small" color="primary" onClick={() => {
                    
                }}>
                Remove
                </Button>
            </CardActions>

        ) : "" }
        
        </Card>



    );

}