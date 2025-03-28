import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, act, waitFor } from '@testing-library/react';
import AccessibilityTable from '../../../src/components/Map/components/AccessibilityTable';
import { httpService } from '../../../src/services/http/httpService';

import { CategoriesProvider } from '../../../src/components/Categories/CategoriesContext';

jest.mock('../../../src/services/http/httpService');

const examplePlaces = [
    {
        data: [
            ['accessible_by', ['pedestrians', 'cars']],
            ['type_of_place', 'big bridge'],
        ],
        metadata: {
            uuid: 'hidden',
        },
        position: [51.1095, 17.0525],
        subtitle: 'big bridge',
        title: 'Grunwaldzki',
    },
    {
        data: [
            ['accessible_by', ['bikes', 'pedestrians']],
            ['type_of_place', 'small bridge'],
        ],
        metadata: {
            uuid: 'dattarro',
        },
        position: [51.10655, 17.0555],
        subtitle: 'small bridge',
        title: 'Zwierzyniecka',
    },
];

httpService.getLocationsData.mockResolvedValue(examplePlaces);

describe('Accessibility Table', () => {
    beforeEach(() => {
        const lat = 51.10655;
        const lng = 17.0555;
        return act(() => {
            render(
                <CategoriesProvider>
                    <AccessibilityTable
                        userPosition={{ lat, lng }}
                        setIsAccessibilityTableOpen={() => {}}
                    />
                </CategoriesProvider>,
            );
        });
    });

    it('should properly render the table', () =>
        waitFor(() => {
            expect(screen.getByText('Grunwaldzki')).toBeInTheDocument();
            expect(screen.getByText('Zwierzyniecka')).toBeInTheDocument();
        }));

    it('should render "Zwierzyniecka" before "Grunwaldzki"', () =>
        waitFor(() => {
            const zwierzynieckaRow = screen.getByText('Zwierzyniecka');
            const grunwaldzkiRow = screen.getByText('Grunwaldzki');
            expect(zwierzynieckaRow).toBeInTheDocument();
            expect(grunwaldzkiRow).toBeInTheDocument();

            expect(zwierzynieckaRow.compareDocumentPosition(grunwaldzkiRow)).toBe(
                Node.DOCUMENT_POSITION_PRECEDING,
            );
        }));

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
