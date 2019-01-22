import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "../components/Fish";
import base from "../base";

class App extends React.Component {
  // static so that it applies to all instances of Fish
  static propTypes = {
    match: PropTypes.object
  };

  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    // linking the app to firebase
    const { params } = this.props.match;
    // first reinstate the local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    // check if exists (won't exist on first visit ever)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    // need to create a reference to a particular piece of the online database
    // and then give an object representing the state and the piece of our local state
    // we want to link
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    // this will run everytime the state is updated
    // need to store the order fot for this specific store
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. take a copy of the fishes
    const fishes = { ...this.state.fishes };
    // 2. add the new fish
    fishes[`fish-${Date.now()}`] = fish;
    // 3. update the state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. take a copy of the current state of fishes
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. set that to state
    this.setState({ fishes }); //  same shorthand for this.setState({ fishes: fishes });
  };

  deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state and remove item
    fishes[key] = null; //  need to set to null, so that Firebase will remove it as well
    // 3. update state
    this.setState({ fishes });
  };

  addToOrder = key => {
    // 1. take a copy of the order state
    const order = { ...this.state.order };
    // 2. either add the fish key or increase the quantity
    order[key] = order[key] + 1 || 1;
    // 3. update the state
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. take a copy of the order state
    const order = { ...this.state.order };
    // 2. either remove the fish key
    delete order[key];
    // 3. update the state
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
