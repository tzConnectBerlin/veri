import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { DataTable, DataTableProps } from './DataTable';

const TestData: DataTableProps = {
  header: [
    { field: 'event_name', value: 'Event Name' },
    { field: 'organizer', value: 'Organizer' },
    { field: 'status', value: 'Status', sortable: true },
    {
      field: 'mint_date',
      value: 'Mint Date',
    },
  ],
  rows: [
    {
      cols: [
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'status',
          value: 'Draft',
          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
      ],
    },
    {
      cols: [
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'status',
          value: 'Draft',
          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
      ],
    },
    {
      cols: [
        { field: 'event_name', value: 'Event1' },
        { field: 'organizer', value: 'Organizer1' },
        {
          field: 'status',
          value: 'Draft',
          sortable: true,
        },
        {
          field: 'mint_date',
          value: '21 Nov 2022',
        },
      ],
    },
  ],
};

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Snapshot testing DataTable Component', () => {
  it('renders correctly', () => {
    const Component = renderer.create(<DataTable {...TestData} />).toJSON();
    expect(Component).toMatchSnapshot();
  });
});

describe('Element testing DataTable Component', () => {
  it('render correctly title, cols and rows', async () => {
    const { container } = render(<DataTable {...TestData} title="All Veris" />);
    const title = screen.getByText(/All Veris/i);
    const rows = container.querySelectorAll('tr');
    const cols = container.querySelectorAll('th');

    expect(title).toBeInTheDocument();
    expect(rows.length).toEqual(4);
    expect(cols.length).toEqual(4);
  });

  it('render correctly Fire handleSort Event', async () => {
    const sortStatus = jest.fn();
    render(<DataTable {...TestData} handleSort={sortStatus} />);
    const button = await screen.getByRole('button');
    fireEvent.click(button);
    expect(sortStatus).toBeCalledTimes(1);
  });
});
