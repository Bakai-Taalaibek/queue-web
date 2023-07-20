import { create } from "zustand";

export const useServiceChooser = create((set, get) => ({
	parameters: {
		city: null,
		address: null,
		service: null,
		client_type: 'physical',
		is_pensioner: false,
		is_appointment: false,
		comment: null,
		branch: 1
	},
	documents: [{ name: 'паспорт', required: true, lang_name: [] }],
	serverResponse: {},
	allBranches: [],
	setService: (newService) => {
		set({ parameters: {...get().parameters, service: newService} })
	},
	setPersonState: (newPerson) => {
		set({ parameters: {...get().parameters, client_type: newPerson} })
	},
	setPensionerState: (newPensioner) => {
		console.log(newPensioner)
		set({ parameters: {...get().parameters, is_pensioner: newPensioner} })
	},
	setDocuments: (newDocuments) => {
		set({ documents: newDocuments })
	},
	setServerResponse: (newResponse) => {
		set({ serverResponse: newResponse })
		// console.log('zustand:', get().serverResponse)
	},
	setCity: (newCity) => {
		set({ parameters: {...get().parameters, city: newCity} })
	},
	setAllBranches: (receivedBranches) => {
		set({ allBranches: receivedBranches })
	},
	setBranch: (newBranch) => {
		set({ parameters: {...get().parameters, branch: newBranch} })
	},
	resetParameters: () => { 
		set({ parameters: {
			city: null,
			address: null,
			service: null,
			client_type: 'physical',
			is_pensioner: false,
			is_appointment: false,
			comment: null,
			branch: 1
		} })
		set({ documents: [{ name: 'паспорт', required: true, lang_name: [] }] })
		set({ serverResponse: {} })
	}
}))