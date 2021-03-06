import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';



export default function CardFood(props) {
    const { name, cuisine, description, img_url, rating, removeFood, location_id, food_id, currentUser, user_id, darkMode } = props;
    
    const cardFoodCSS = makeStyles((theme) => ({
        root: {
            gridArea: '1/1/3/4',
            justifySelf: 'center',
            overflow: 'scroll',
            width: '40vmin',
            height: '70vmin',
            margin: '50px 0px',
            minWidth: 350,
            minHeight: 550,
            borderRadius: 20,
            backgroundColor: (darkMode === true) ? '#30292f' : "#1d7dc2",
        },
        media: {
            width: '40vmin',
            borderRadius: '20px 20px 0 0',
            minWidth: 350,
            maxHeight: 325,
        },
        button: {
            color: (darkMode === true) ? '#d4cdc3' : '#f8f7ff',
        },
        link: {
            textDecoration: 'none',
        },
        text: {
            display: 'flex',
            color: (darkMode === true) ? '#d4cdc3' : '#f8f7ff',
            overFlow: 'auto',
            justifyContent: 'center',
        },
    }));
    
    const StyledRating = withStyles({
        root: {
            display: 'flex',
            margin: '2px 15px',
            width: 270,
            fontSize: 50,
            justifyContent: 'center',
        },
        iconFilled: {
            color: (darkMode === true) ? '#3e885b' : '#e4b612',
            width: 50,
            height: 50,
        },
        iconEmpty: {
            color: '#d4cdc3',
        }
    })(Rating);

    const classes = cardFoodCSS();

    return (
        <Card 
            className={classes.root}
            // className={classes.root}
            >
            <CardActionArea >
            <CardMedia
                className={classes.media}
                component="img"
                src={img_url}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div"  className={classes.text}>
                {name}
                </Typography>
                <Typography variant="body2" component="div" className={classes.text}>
                <StyledRating 
                    readOnly
                    name="rating" 
                    precision={0.5} 
                    value={(rating)/2}
                    />
                </Typography>
                <Typography variant="body2" component="div" className={classes.text}>
                {cuisine}
                </Typography>
                <Typography variant="body2" component="div" className={classes.text}>
                {description}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                {(currentUser?.id === user_id) &&
                <React.Fragment>
                    <Link to={`/locations/${location_id}/foods/${food_id}/edit`} className={classes.link}>
                        <Button size="small" color="primary" className={classes.button}>
                            Edit
                        </Button>
                    </Link>
                    <Button size="small" color="primary" onClick={() => removeFood(location_id,food_id)} className={classes.button}>
                        Delete
                    </Button>
                </React.Fragment>
                }
            </CardActions>
        </Card>
    );
}
