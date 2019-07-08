This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> You can find the tutorial [here]().

## Background

A element, by definition and spec, cannot accept complex properties like objects or arrays. This is a problem when we want to use these kinds of properties in a React project.

For example, this code doesn't work:

```jsx
const App = function() {
  const data = { a: true }
  return (
    <div className="my-app">
      <my-comp data={data} />
    </div>
  )
}
```

Because in runtime, the data passed as attribute is converted to string using `.toString()`. For that reason, if you pass an object, you will ended up receiving an `[object Object]` (because `{ a: true }.toString()`).

Another problem of using custom elements in JSX is respect to _custom events_. By default, React don't recognize custom events and never will add the listener to the element.

For example, this code doesn't works:

```jsx
const App = function() {
  return (
    <div className="my-app">
      <my-comp onMyCustomEvent={console.log} /> // 'my-custom-event'
    </div>
  )
}
```

You then will ended up using a ref callback to add the listeners manually.

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

---

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
