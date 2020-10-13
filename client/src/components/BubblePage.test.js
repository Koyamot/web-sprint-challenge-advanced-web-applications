import React from "react";
import { render, screen, wait } from "@testing-library/react";
import BubblePage from "./BubblePage";
import axios from "axios";
// import { axiosWithAuth } from '..api/axiosWithAuth'



const axiosFetch = () => {
  const token =
  "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98"
  localStorage.setItem('token', token)
  return axios.create({
    headers: {
        Authorization: token
    },
    baseURL: "http://localhost:5000/"
})
}

const mockFetchColors = () => {
  axiosFetch()
  .get("api/colors")
  .then(res => setColorList(res.data))
  .catch(err => console.error ('error!', err))

};


const colorData = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff"
    },
    id: 3
  },
  {
    color: "aquamarine",
    code: {
      hex: "#7fffd4"
    },
    id: 4
  },
  {
    color: "lilac",
    code: {
      hex: "#9a99dd"
    },
    id: 5
  },
  {
    color: "softpink",
    code: {
      hex: "#dd99ba"
    },
    id: 6
  },
  {
    color: "bisque",
    code: {
      hex: "#dd9a99"
    },
    id: 7
  },
  {
    color: "softyellow",
    code: {
      hex: "#dcdd99"
    },
    id: 8
  },
  {
    color: "blanchedalmond",
    code: {
      hex: "#ffebcd"
    },
    id: 9
  },
  {
    color: "blue",
    code: {
      hex: "#6093ca"
    },
    id: 10
  },
  {
    color: "blueviolet",
    code: {
      hex: "#8a2be2"
    },
    id: 11
  }
];

jest.mock(mockFetchColors())

test("Fetches data and renders the bubbles: softyellow", async () => {
  // Finish this test
  mockFetchColors(colorData)
  const { getByText } = render(<BubblePage />);

  await wait(() => {
    getByText(/softyellow/i)

  })

  const color = screen.getByText(/softyellow/i)
  expect(color).toBeInTheDocument();
});


