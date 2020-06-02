// Library Imports
import * as clipboard from "clipboard-polyfill";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AddressDropdown from "../../../components/_inputs/addresses_dropdown/index.js";
import Description from "../../../components/_inputs/description";
import Footer from "../../../components/_inputs/footer";
import Form from "../../../components/_inputs/form";
import Input from "../../../components/_inputs/input";
import { Container } from "./styles";
import { DesktopAppState } from "platforms/desktop/reducers";

type AddressOption = { label: string; address: string };

interface OwnAddressState {
  selected: AddressOption;
  copyButtonState: string;
  secondTabLabel: string;
}

interface OwnAddressProps {
  addressOptions: AddressOption[];
}

class OwnAddressContainer extends Component<OwnAddressProps, OwnAddressState> {
  private addressValue: any = React.createRef();

  state: OwnAddressState = {
    selected: this.props.addressOptions[0],
    copyButtonState: "",
    secondTabLabel: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  selectAddress = (selected: AddressOption) => {
    this.setState({
      selected,
    });
  };

  clipboardAddress = () => {
    const { address } = this.state.selected;

    this.setState({
      copyButtonState: "Copied Address",
    });

    clipboard.writeText(address);

    setTimeout(() => {
      this.setState({
        copyButtonState: "Copy Address",
      });
    }, 1000);
  };

  render() {
    const windowWidth = window.innerWidth;
    return (
      <Fragment>
        <Form>
          <AddressDropdown
            label="Vault Address"
            placeholder="Select an Address"
            readOnly={true}
            value={this.state.secondTabLabel}
            options={this.props.addressOptions}
            onClick={this.selectAddress}
            editable={false}
          />
          {windowWidth < 1380 ? (
            <Description
              label="Haven Address"
              placeholder="Select an address"
              width={true}
              value={this.state.selected.address}
              readOnly={true}
              rows={windowWidth < 600 ? "3" : "2"}
            />
          ) : (
            <Input
              ref={(textarea) => (this.addressValue = textarea)}
              label="Haven Address"
              placeholder="Select an address"
              width={true}
              type={"text"}
              name="address"
              value={this.state.selected.address}
              readOnly={true}
            />
          )}
        </Form>
        <Container>
          <Footer
            label={this.state.copyButtonState}
            onClick={this.clipboardAddress}
          />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({});

export const OwnAddress = connect(mapStateToProps, null)(OwnAddressContainer);
