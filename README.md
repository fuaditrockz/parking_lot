# Parking Lot

### Study Case

User own a parking lot that can hold up to 'n' cars at any given point in time. Each slot is given a number starting at 1 increasing with increasing distance from the entry point in steps of one. User want to create an automated ticketing system that allows user's customers to use user's parking lot without human intervention.

When a car enters user's parking lot, User want to have a ticket issued to the driver. The ticket issuing process includes us documenting the registration number (number plate) and the color of the car and allocating an available parking slot to the car before actually handing over a ticket to the driver (user assume that their customers are nice enough to always park in the slots allocated to them). The customer should be allocated a parking slot which is nearest to the entry. At the exit the customer returns the ticket with the time the car was parked in the lot, which then marks the slot they were using as being available. The total parking charge should be calculated as per the parking time. Charge applicable is $ 10 for first 2 hours and $ 10 for every additional hour.

User interact with the system via a simple set of commands which produce a specific output. Take a look at the example below, which includes all the commands
I need to support - they're self explanatory. The system should accept a file name as a parameter at the command prompt and read the commands from that [file](https://github.com/fuaditrockz/parking_lot/blob/master/file_input.txt).

#### 1. Download the repository
Just choose some folder on your terminal/shell to put this project. And then run this command:
```
> git clone git@github.com:fuaditrockz/parking_lot.git
```

#### 2. Running Locally

a. Choose the `parking_lot` folder:
```
> cd parking_lot
```

b. Run the `npm` command to install all dependencies package.
```
> npm install
```

c. Running the application.
```
> npm start
```

#### 3. Output

<div align="center">
    <img src="https://res.cloudinary.com/telecreativenow/image/upload/v1592031302/output.png" alt="output" width="50%">
</div>