import React from 'react'
import Sidebar from '../Sidebar';
const IssueBookForm = () => {
  return (
    <>
    <Sidebar/>
      <section className="signin">
        <div className="contanier mt-5">
          <div className="signin-content">
            <div className="signin-form">
              <h2 className="form-title">Issue Book</h2>
              <form
                method="POST"
                className="register-form"
                id="register-form"
                //onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="bookname">
                    <i className="zmdi zmdi-book"></i>
                  </label>
                  <input
                    type="text"
                    name="book"
                    id="book"
                    autoComplete="off"
                    // value={email}
                    //onChange={(e) => setEmail(e.target.value)}
                    placeholder="Book name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Book id">
                    <i className="zmdi zmdi-label"></i>
                  </label>
                  <input
                    type="text"
                    name="bookid"
                    id="bookid"
                    autoComplete="off"
                   // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter book id"
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="issue"
                    id="issue"
                    className="form-submit"
                    value="Issue"
                  />
                </div>
              
              
                <div></div>
              </form>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
  

export default IssueBookForm