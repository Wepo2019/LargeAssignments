import React from 'react';
import { connect } from 'react-redux';
import { getAllUsernames } from '../../actions/userActions';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ''
      };
    }

    onInput(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const { getAllUsernames } = this.props;
        const { name } = this.state;
        getAllUsernames(name);
      }

      render() {
        const { name } = this.state;
        return (
          <div className="text-center" style={{ marginTop: 40 }}>
            <form action="" onSubmit={e => this.onSubmit(e)} className="form-horizontal">
              <div className="form-group">
                <input type="text" name="name" id="name" value={ name } onChange={e => this.onInput(e)} />
              </div>
              <div className="form-group">
                <input type="submit" value="Login!" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
      }
}

export default connect(null, { getAllUsernames })(Login);