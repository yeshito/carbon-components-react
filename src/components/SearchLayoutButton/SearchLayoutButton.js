import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { iconList, iconGrid } from 'carbon-icons';
import Icon from '../Icon';

/**
 * The layout button for `<Search>`.
 */
class SearchLayoutButton extends Component {
  static propTypes = {
    /**
     * The layout.
     */
    format: PropTypes.oneOf(['list', 'grid']),

    /**
     * The a11y label text.
     */
    labelText: PropTypes.string,

    /**
     * The description for the "list" icon.
     */
    iconDescriptionList: PropTypes.string,

    /**
     * The description for the "grid" icon.
     */
    iconDescriptionGrid: PropTypes.string,

    /**
     * The callback called when layout switches.
     */
    onChangeFormat: PropTypes.func,
  };

  static defaultProps = {
    labelText: 'Filter',
    iconDescriptionList: 'list',
    iconDescriptionGrid: 'grid',
  };

  static getDerivedStateFromProps({ format }, state) {
    const { prevFormat } = state || {};
    return state && prevFormat === format
      ? null
      : {
          format: format || 'list',
          prevFormat: format,
        };
  }

  /**
   * Toggles the button state upon user-initiated event.
   */
  toggleLayout = () => {
    const format = this.state.format === 'list' ? 'grid' : 'list';
    this.setState({ format }, () => {
      const { onChangeFormat } = this.props;
      if (typeof onChangeFormat === 'function') {
        onChangeFormat({ format });
      }
    });
  };

  render() {
    const { labelText, iconDescriptionList, iconDescriptionGrid } = this.props;
    return (
      <button
        className="bx--search-button"
        type="button"
        onClick={this.toggleLayout}
        aria-label={labelText}>
        {this.state.format === 'list' ? (
          <div className="bx--search__toggle-layout__container">
            <Icon
              icon={iconList}
              description={iconDescriptionList}
              className="bx--search-view"
            />
          </div>
        ) : (
          <div className="bx--search__toggle-layout__container">
            <Icon
              icon={iconGrid}
              description={iconDescriptionGrid}
              className="bx--search-view"
            />
          </div>
        )}
      </button>
    );
  }
}

export default SearchLayoutButton;
