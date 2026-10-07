import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div>
          <p>Could not load this page (network problem or a new version was deployed).</p>
          <button onClick={() => location.reload()}>Reload page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
