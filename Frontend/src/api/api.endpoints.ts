import instance from "../api/axios.ts";
import { jwtDecode } from "jwt-decode";
import { User, Game, UserResult } from "../api/types.ts";

export async function signup(user: User): Promise<UserResult> {
  try {
    const response = await instance.post(`/signup`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data;
      if (responseData.error) {
        return {
          error: responseData.error,
          emailError: responseData.emailError,
          usernameError: responseData.usernameError,
        };
      }
    }
    return { error: "Error in signup" };
  }
}

export async function updateUser(user: User): Promise<UserResult> {
  try {
    const response = await instance.post(`/users/update`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      const decodedUser: User = jwtDecode(response.data.accessToken);
      return { user: decodedUser };
    }
    return { error: "Unexpected error" };
  } catch (error: any) {
    console.error("Error updating user:", error);
    if (error.response) {
      const errorData = error.response.data;
      if (errorData) {
        return { emailError: errorData.emailError };
      }
    }
    return { error: "Error in user update" };
  }
}

export async function updateUserWithImage(formData: FormData): Promise<UserResult> {
  try {
    const response = await instance.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      const decodedUser: User = jwtDecode(response.data.accessToken);
      return { user: decodedUser };
    }
    return { error: "Unexpected error" };
  } catch (error: any) {
    console.error("Error updating user:", error);
    if (error.response) {
      const errorData = error.response.data;
      if (errorData) {
        return { usernameError: errorData.usernameError };
      }
    }
    return { error: "Error in user update" };
  }
}

export async function login(
  username: string,
  password: string
): Promise<UserResult> {
  try {
    const response = await instance.post("/login", {
      username,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return { accessToken: response.data.accessToken };
    }
    return { error: response.data.error };
  } catch (error: any) {
    return { error: "Error in login" };
  }
}

export async function getGames(limit?: number): Promise<Game[]> {
  try {
    const response = await instance.get(`/games/${limit}`);
    return response.data;
  } catch (error: any) {
    return [];
  }
}

export async function getAccessTokenByUsername(username: string): Promise<UserResult> {
  try {
    const response = await instance.get(`/users/${username}`);
    if (response.data.userNotFoundError) {
      return { existError: response.data.userNotFoundError };
    }
    if (response.data.accessToken) {
      return { accessToken: response.data.accessToken };
    }
    return { error: "Unexpected error" };
  } catch (error: any) {
    return { error: error };
  }
}

export async function findMatchingUsers(user: User) {
  try {
    const response = await instance.post(`/users/match`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.matchError) {
      return { matchError: response.data.matchError };
    }
    return { users: response.data.users };
  } catch (error: any) {
    return { error: error };
  }
}