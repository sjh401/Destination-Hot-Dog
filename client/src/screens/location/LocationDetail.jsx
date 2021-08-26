import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { filterFoods } from '../../assets/functions';
import FoodCard from '../../components/card/FoodCard';
import './Location.css'

export default function LocationDetail(props) {
    const { allLocations, allFoods, currentUser } = props;
    const { location_id } = useParams();
    const [ location, setLocation ] = useState([]);
    const [ foods, setFoods ] = useState([]);
    const [ filterFoods, setFilterFoods ] = useState([]);
    const [ filter, setFilter ] = useState({cuisine: "All"})

    useEffect(() => {
        const oneLocation = allLocations.find(location => {
            return location.id === Number(location_id)
        });
        setLocation(oneLocation);
    },[allLocations, location_id])

    useEffect(() => {
        const locationFoods = allFoods?.filter(food => food.location_id === Number(location_id));
        setFoods(locationFoods)
    },[allFoods, location_id])

    useEffect(() => {
        if(filter.cuisine !== "All") {
            setFilterFoods(foods.filter(food => food.cuisine === filter.cuisine))
        } else {
            setFilterFoods(foods)
        }
    },[filter, foods])
    console.log(filter)
    console.log(foods)

    const handleChange = (e) => {
        const { cuisine, value } = e.target;
        setFilter( {cuisine: value} )
    }


    
    return (
        <div className="location-detail-grid">
            <div className="location-detail-header">
                <h1>{location?.name}</h1>
                
            </div>
            <div className="location-detail-foods">
                <form>
                    <select 
                        name="cuisine"
                        value={filter.cuisine}
                        onChange={handleChange}
                        >
                        <option value="All">Filter Foods</option>
                        <option value="Appitizer">Appitizer</option>
                        <option value="Entree">Entree</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>
                        <option value="Beverage">Beverage</option>
                        <option value="Alcohol">Alcohol</option>
                    </select>
                </form>
                <div className="location-detail-food-cards">
                    {filterFoods.map(food => (
                        <React.Fragment key={food.id}>
                            <Link to={`/locations/${location_id}/foods/${food.id}`} className="locations-container-link">
                                <FoodCard
                                    name={food.name}
                                    cuisine={food.cuisine}
                                    description={food.description}
                                    img_url={food.img_url}
                                />
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="location-detail-description">
                {currentUser &&
                    <div>
                        <Link to={`/locations/${location_id}/foods/new`} className="locations-container-link">Create New Food</Link>
                    </div>
                }
                <div>
                    {location?.description}
                </div>
            </div>
        </div>
    )
}
