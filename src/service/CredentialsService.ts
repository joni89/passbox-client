import axios from 'axios';

import Credentials from '@/model/Credentials';

export default class CredentialsService {

	public findAll(): Promise<Credentials[]> {
		return axios('http://localhost:8080/credentials')
			.then(response => response.data as Credentials[]);
	}

	public save(credentials: Credentials): Promise<Credentials> {
		return axios.post('http://localhost:8080/credentials', credentials)
			.then(response => response.data as Credentials);
	}

	public update(credentials: Credentials): Promise<Credentials> {
		const encodedId = encodeURIComponent(String(credentials.id));
		return axios.put('http://localhost:8080/credentials/' + encodedId, credentials)
			.then(response => response.data as Credentials);
	}

	public delete(credentials: Credentials): Promise<void> {
		const encodedId = encodeURIComponent(String(credentials.id));
		return axios.delete('http://localhost:8080/credentials/' + encodedId)
			.then(response => response.data);
	}

}
