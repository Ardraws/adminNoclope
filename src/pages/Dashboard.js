import React from 'react';
import { Table } from 'semantic-ui-react';

function Dashboard() {
    return (
        <div className="w-full flex items-center justify-center pt-20 -mt-2">
            <Table celled striped>
                <Table.Header>
                <Table.Row className="text-center">
                    <Table.HeaderCell>Nom</Table.HeaderCell>
                    <Table.HeaderCell>Objectif</Table.HeaderCell>
                    <Table.HeaderCell>Montant collecté</Table.HeaderCell>
                    <Table.HeaderCell>Total à collecter</Table.HeaderCell>
                    <Table.HeaderCell>Inscription</Table.HeaderCell>
                    <Table.HeaderCell>Dernière connexion</Table.HeaderCell>
                    <Table.HeaderCell>Age</Table.HeaderCell>
                    <Table.HeaderCell>Sexe</Table.HeaderCell>
                    <Table.HeaderCell>Localisation</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                <Table.Row>
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                    <Table.Cell collapsing>
                    </Table.Cell>
                </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}

export default Dashboard
