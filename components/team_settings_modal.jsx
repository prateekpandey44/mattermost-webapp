// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import $ from 'jquery';

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {Modal} from 'react-bootstrap';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';

import * as Utils from 'utils/utils.jsx';

import SettingsSidebar from './settings_sidebar.jsx';
import TeamSettings from './team_settings.jsx';

const holders = defineMessages({
    generalTab: {
        id: 'team_settings_modal.generalTab',
        defaultMessage: 'General'
    },
    importTab: {
        id: 'team_settings_modal.importTab',
        defaultMessage: 'Import'
    }
});

class TeamSettingsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'general',
            activeSection: ''
        };
    }

    componentDidMount() {
        if (!Utils.isMobile()) {
            $('.settings-modal .settings-content').perfectScrollbar();
        }
    }

    updateTab = (tab) => {
        this.setState({
            activeTab: tab,
            activeSection: ''
        });

        if (!Utils.isMobile()) {
            $('.settings-modal .modal-body').scrollTop(0).perfectScrollbar('update');
        }
    }

    updateSection = (section) => {
        if ($('.section-max').length) {
            $('.settings-modal .modal-body').scrollTop(0).perfectScrollbar('update');
        }

        this.setState({activeSection: section});
    }

    closeModal = () => {
        this.props.onModalDismissed();
    }

    collapseModal = () => {
        $(ReactDOM.findDOMNode(this.refs.modalBody)).closest('.modal-dialog').removeClass('display--content');

        this.setState({
            active_tab: '',
            active_section: ''
        });
    }

    handleHide = () => {
        this.props.onModalDismissed();
    }

    render() {
        const {formatMessage} = this.props.intl;
        const tabs = [];
        tabs.push({name: 'general', uiName: formatMessage(holders.generalTab), icon: 'icon fa fa-cog'});
        tabs.push({name: 'import', uiName: formatMessage(holders.importTab), icon: 'icon fa fa-upload'});

        return (
            <Modal
                dialogClassName='settings-modal settings-modal--action'
                show={this.props.show}
                onHide={this.handleHide}
                onExited={this.handleHide}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        <FormattedMessage
                            id='team_settings_modal.title'
                            defaultMessage='Team Settings'
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body ref='modalBody'>
                    <div className='settings-table'>
                        <div className='settings-links'>
                            <SettingsSidebar
                                tabs={tabs}
                                activeTab={this.state.activeTab}
                                updateTab={this.updateTab}
                            />
                        </div>
                        <div className='settings-content minimize-settings'>
                            <TeamSettings
                                activeTab={this.state.activeTab}
                                activeSection={this.state.activeSection}
                                updateSection={this.updateSection}
                                closeModal={this.closeModal}
                                collapseModal={this.collapseModal}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

TeamSettingsModal.propTypes = {
    intl: intlShape.isRequired,
    show: PropTypes.bool,
    onModalDismissed: PropTypes.func
};

export default injectIntl(TeamSettingsModal);
