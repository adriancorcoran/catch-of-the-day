import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
  // static so that it applies to all instances of Fish
  static propTypes = {
    addFish: PropTypes.func
  };

  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = event => {
    // 1. stop the form from submitting
    event.preventDefault();
    // 2. create a fish object from the data
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value), //  store in cents
      desc: this.descRef.value.value,
      status: this.statusRef.value.value,
      image: this.imageRef.value.value
    };
    // 3. add the fish to state
    this.props.addFish(fish);
    // 4. reset the form by selecting the current target
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
