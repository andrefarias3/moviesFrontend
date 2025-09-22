import { render, screen } from '@testing-library/react';
import StatusLabel from '../StatusLabel';

test("renders menssage status", () => {
    render(<StatusLabel statusMsg={'test msg'} />);
    expect(screen.getByText('test msg')).toBeInTheDocument();
});