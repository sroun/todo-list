import { describe } from "node:test";
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Page from '@/app/page';

describe('Page', () => {
	test('should have text "No result. Create a new one instead!" when empty item', () => {
		render(<Page />)

		const element = screen.getByText('No result. Create a new one instead!')

		expect(element).toBeInTheDocument();
	})

	test('renders input field with placeholder "Try typing..."', async () => {

		render(<Page />);

		// Find the input field by placeholder text
		const inputElements = screen.getAllByPlaceholderText('Try typing...')

		expect(inputElements.length).toBeGreaterThanOrEqual(1);

		inputElements.forEach((inputElement) => {
			expect(inputElement).toHaveAttribute('type', 'text');
		});

	})

	test('should have red border line on submit blank', async () => {

		render(<Page />);

		// Find the input field by placeholder text
		const inputElement = screen.getByPlaceholderText('Try typing...')

		userEvent.type(inputElement, '{enter}');

		// Wait for the asynchronous operation to complete
		await waitFor(() => {
			// Make assertions after the async operation
			expect(inputElement).toHaveClass('border-red-600');
		});

	})

	test('creates a record when enter is pressed in the input field', async () => {

		render(<Page />)

		// Find the input field by placeholder text
		const inputElement = screen.getByPlaceholderText('Try typing...');


		// user type into the input field
		userEvent.type(inputElement, 'create new task');


		// Use fireEvent to simulate pressing the Enter key
		fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

		await waitFor(() => {
			expect(inputElement).toHaveValue('')
		})		
	})

});