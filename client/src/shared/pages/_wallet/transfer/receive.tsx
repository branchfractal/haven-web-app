import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AddressDropdown from "../../../components/_inputs/addresses_dropdown/index.js";
import Description from "../../../components/_inputs/description";
import Footer from "../../../components/_inputs/footer";
import DoubleFooter from "../../../components/_inputs/double_footer";
import Form from "../../../components/_inputs/form";
import Input from "../../../components/_inputs/input";
import { Container } from "./styles";
import { DesktopAppState } from "platforms/desktop/reducers";
import { AddressEntry } from "shared/reducers/address";
import { writeText } from "vendor/clipboard/clipboard-polyfill";

interface OwnAddressState {
  selected: AddressEntry;
  copyButtonState: string;
  secondTabLabel: string;
}

interface OwnAddressProps {
  addresses: AddressEntry[];
}

class OwnAddressContainer extends Component<OwnAddressProps, OwnAddressState> {
  private addressValue: any = React.createRef();

  state: OwnAddressState = {
    selected: this.props.addresses[0],
    copyButtonState: "Copy",
    secondTabLabel: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  selectAddress = (selected: AddressEntry) => {
    this.setState({
      selected,
    });
  };

  clipboardAddress = () => {
    const { address } = this.state.selected;

    this.setState({
      copyButtonState: "Copied...",
    });

    writeText(address);

    setTimeout(() => {
      this.setState({
        copyButtonState: "Copy",
      });
    }, 1000);
  };

  render() {
    const windowWidth = window.innerWidth;

    if (this.props.addresses.length === 0) {
      return null;
    }

    const qrEnabled = false;

    return (
      <Fragment>
        <Form>
          <AddressDropdown
            label="Select Vault"
            readOnly={true}
            value={this.props.addresses[0].label}
            options={this.props.addresses}
            onClick={this.selectAddress}
            editable={false}
          />
          {windowWidth < 1380 ? (
            <Description
              label="Selected Vault Address"
              width={true}
              value={this.state.selected.address}
              readOnly={true}
              rows={windowWidth < 600 ? "3" : "2"}
            />
          ) : (
            <Input
              ref={(textarea) => (this.addressValue = textarea)}
              label="Selected Vault Address"
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
          {qrEnabled ? (
            <DoubleFooter
              leftLabel={"Show QR"}
              leftDisabled={false}
              leftLoading={false}
              leftOnClick={() => {}}
              rightLabel={this.state.copyButtonState}
              rightDisabled={false}
              rightLoading={false}
              rightOnClick={this.clipboardAddress}
              onClick={() => {}}
            />
          ) : (
            <Footer
              label={this.state.copyButtonState}
              onClick={this.clipboardAddress}
              disabled={false}
              loading={false}
            />
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({});

export const OwnAddress = connect(mapStateToProps, null)(OwnAddressContainer);
