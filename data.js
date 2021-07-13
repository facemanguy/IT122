const cars = [
    {
        model : "Mazda3",
        type : "Hatchback",
        year : 2018,
        make : "Mazda",
        color : "grey",
        capacity : 5,
        horsepower : 185
    },
    {
        model : "Pathfinder",
        type : "SUV",
        year : 2003,
        make : "Nissan",
        color : "red",
        capacity : 5,
        horsepower : 240
    },
    {
        model : "M5",
        type : "Sedan",
        year : 2008,
        make : "BMW",
        color : "Silver",
        capacity : 5,
        horsepower : 500
    },
    {
        model : "ModelS",
        type : "Sedan",
        year : 2021,
        make : "Tesla",
        color : "white",
        capacity : 5,
        horsepower : 1020
    },
    {
        model : "Tacoma",
        type : "Truck",
        year : 1999,
        make : "Toyota",
        color : "blue",
        capacity : 2,
        horsepower : 190
    }
];

export const getAll = () => {
    return cars;
};

export const getItem = (model) => {
    return cars.find((cars) =>{
        return cars.model === model;
    });
};