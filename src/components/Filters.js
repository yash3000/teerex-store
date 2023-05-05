import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

import "./Filters.css";
const colorArray = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
];
const genderArray = [
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
];
const priceArray = [
    { label: 'Less than Rs250', value: '0-250' },
    { label: 'Rs251 - Rs450', value: '251-450' },
    { label: 'Greater than Rs450', value: '450-max' },
];
const typeArray = [
    { label: 'Polo', value: 'polo' },
    { label: 'Hoodie', value: 'hoodie' },
    { label: 'Basic', value: 'basic' },
];

const Filters = ({ performFilterSearch }) => {
    const [colorCheckedValues, setColorCheckedValues] = useState([]);
    const [genderCheckedValues, setGenderCheckedValues] = useState([]);
    const [priceCheckedValues, setPriceCheckedValues] = useState([]);
    const [typeCheckedValues, setTypeCheckedValues] = useState([]);

    const handleColorChange = (event) => {
        const { value } = event.target;
        const newColorCheckedValues = (colorCheckedValues.indexOf(value) > -1) ?
            colorCheckedValues.filter((checkedValue) => checkedValue !== value)
            : [...colorCheckedValues, value];
        setColorCheckedValues(newColorCheckedValues);
    };

    const handleGenderChange = (event) => {
        const { value } = event.target;
        const newGenderCheckedValues = (genderCheckedValues.indexOf(value) > -1) ?
            genderCheckedValues.filter((checkedValue) => checkedValue !== value)
            : [...genderCheckedValues, value];
        setGenderCheckedValues(newGenderCheckedValues);
    };

    const handlePriceChange = (event) => {
        const { value } = event.target;
        const newPriceCheckedValues = (priceCheckedValues.indexOf(value) > -1) ?
            priceCheckedValues.filter((checkedValue) => checkedValue !== value)
            : [...priceCheckedValues, value];
        setPriceCheckedValues(newPriceCheckedValues);
    };

    const handleTypeChange = (event) => {
        const { value } = event.target;
        const newTypeCheckedValues = (typeCheckedValues.indexOf(value) > -1) ?
            typeCheckedValues.filter((checkedValue) => checkedValue !== value)
            : [...typeCheckedValues, value];
        setTypeCheckedValues(newTypeCheckedValues);
    };

    useEffect(() => {
        performFilterSearch(colorCheckedValues, genderCheckedValues, priceCheckedValues, typeCheckedValues);
    }, [colorCheckedValues, genderCheckedValues, priceCheckedValues, typeCheckedValues]);

    return (
        <Grid container
            item
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="start"
            my={2}
            sx={{
                width: "fit-content",
                minWidth: "50%"
            }}
            xs={12}
            sm={4}
            className="filter-container"
        >
            <Typography
                variant="h5"
                color="textPrimary"
                sx={{ fontWeight: "bold" }}
                mb={1}
                className="filter-label"
            >
                Color
            </Typography>
            <Grid container
                item
                direction="column"
                justifyContent="center"
                xs={12}
                sm={4}
                className="filter-color"
                key={"filter-color"}
            >
                {colorArray.map((color) => (
                    <Grid
                        item
                        className="filters"
                        key={color.value}
                    >
                        <label>
                            <input
                                type="checkbox"
                                checked={colorCheckedValues.indexOf(color.value) > -1}
                                onChange={handleColorChange}
                                value={color.value}
                            />
                            {color.label}
                        </label>
                    </Grid>
                ))}
            </Grid>

            <Typography
                variant="h5"
                color="textPrimary"
                sx={{ fontWeight: "bold" }}
                mb={1}
                className="filter-label"
            >
                Gender
            </Typography>
            <Grid container
                item
                direction="column"
                justifyContent="center"
                xs={12}
                sm={4}
                className="filter-gender"
                key={"filter-gender"}
            >
                {genderArray.map((gender) => (
                    <Grid
                        item
                        className="filters"
                        key={gender.value}
                    >
                        <label>
                            <input
                                type="checkbox"
                                checked={genderCheckedValues.indexOf(gender.value) > -1}
                                    onChange={handleGenderChange}
                                    value={gender.value}
                            />
                            {gender.label}
                        </label>
                    </Grid>
                ))}
            </Grid>

            <Typography
                variant="h5"
                color="textPrimary"
                sx={{ fontWeight: "bold" }}
                mb={1}
                className="filter-label"
            >
                Price
            </Typography>
            <Grid container
                item
                direction="column"
                justifyContent="center"
                xs={12}
                sm={4}
                className="filter-price"
                key={"filter-price"}
            >
                {priceArray.map((price) => (
                    <Grid
                        item
                        className="filters"
                        key={price.value}
                    >
                        <label>
                            <input
                                type="checkbox"
                                checked={priceCheckedValues.indexOf(price.value) > -1}
                                    onChange={handlePriceChange}
                                    value={price.value}
                            />
                            {price.label}
                        </label>
                    </Grid>
                ))}
            </Grid>

            <Typography
                variant="h5"
                color="textPrimary"
                sx={{ fontWeight: "bold" }}
                mb={1}
                className="filter-label"
            >
                Type
            </Typography>
            <Grid container
                item
                direction="column"
                justifyContent="center"
                xs={12}
                sm={4}
                className="filter-type"
                key={"filter-type"}
            >
                {typeArray.map((type) => (
                    <Grid
                        item
                        className="filters"
                        key={type.value}
                    >
                        <label>
                            <input
                                type="checkbox"
                                checked={typeCheckedValues.indexOf(type.value) > -1}
                                    onChange={handleTypeChange}
                                    value={type.value}
                            />
                            {type.label}
                        </label>
                    </Grid>
                ))}
            </Grid>

        </Grid>
    );

}


export default Filters;