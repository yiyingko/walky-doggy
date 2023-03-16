const BASE_URL = "http://localhost:3001";

export const getWalk = async (id) => {
	const walk = await fetch(`${BASE_URL}/walks/${id}`);
	return walk.json();
};

export const getAllWalks = async () => {
	const allWalks = await fetch(`${BASE_URL}/walks`);
	return allWalks.json();
};

export const postWalk = async (info) => {
	const response = await fetch(`${BASE_URL}/walks/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(info),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error("Error: AQUI ", error);
		});
	return response;
};

export const deleteWalk = async (id) => {
	try {
		const response = await fetch(`${BASE_URL}/walks/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data.message);
		}
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const updateWalk = async (id, info) => {
	try {
		const response = await fetch(`${BASE_URL}/walks/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		});
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data.message);
		}
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};
