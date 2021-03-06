import API from "../utils/API";
import React, { Component } from "react";
import SearchBox from "./SearchBox";
//import SearchBox from "./SearchBox"
import TableData from "./TableData";
import "./style.css";

class Container extends Component {

    // Setting the component's initial state
    //search starts as an empty string
    //employess and filteredEmployess are empty arrays because that it's the structure of the data we'll be working with
    //order it's to reference the order that the employees are. By defaltu they come randonly and the first click will trigger then to be in asc order
    state = {
        search: "",
        employees: [],
        filteredEmployees: [],
        order: ""

    };

    // this is the initialization, what do you want the page to display when page it's first loaded
    componentDidMount() {
        API.getUsers().then(res => this.setState({
            employees: res.data.results,
            filteredEmployees: res.data.results
        })).catch(err => console.log(err))
    }

    //if "name" it's clicked employee are shown by asc/desc order

    sortByName = () => {
        const filtereds = this.state.filteredEmployees;
        if (this.state.order === "asc") {
            const sorteds = filtereds.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
            console.log(sorteds)

            this.setState({
                filteredEmployees: sorteds,
                order: "desc"
            })
        } else {

            const sorteds = filtereds.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1)
            console.log(sorteds)

            this.setState({
                filteredEmployees: sorteds,
                order: "asc"
            })

        }
    }
    //when input is changing it will dynamically show the associates names that match in the screen
    handleInputChange = event => {

        const employees = this.state.employees;
        const UserInput = event.target.value;
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().indexOf(UserInput.toLowerCase()) > -1
        )
        this.setState({
            //change the state of  filteredEmployes now it holds all the employes that matches users
            // search and will be passed down in this state

            filteredEmployees,

        });


    };


    //API call triggered when page it's refreshed and  when application it's loaded 
    employeeSearch = () => {
        API.getUsers()
            .then(res => this.setState({

                //change their both states to hold all the data from the API call(all employess) and will be passed down trough props like that
                //employee will remain the same and filteredEmployes will be changed and passed down during application's life. Employee will always hold all employess.
                filteredEmployees: res.data.results,
                employees: res.data.results
            }))
            .catch(err => console.log(err))
    }

    //when button search it's clicked
    handleSearch = event => {
        event.preventDefault();
        if (!this.state.search) {
            alert("Enter a name")
        }
        const { employees, search } = this.state;

        //filters the object looking for the value that matches the value entered in the input box by the user  (search.this.state)
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().includes(search.toLowerCase()));

        this.setState({
            filteredEmployees
        });
    }



    render() {

        return (
            <div>

                <SearchBox
                    employee={this.state.employees}
                    handleSearch={this.handleSearch}
                    handleInputChange={this.handleInputChange} />
                <TableData results={this.state.filteredEmployees}
                    sortByName={this.sortByName}

                />
            </div >


        )
    }
}

export default Container