import "bootstrap/dist/css/bootstrap.css";

const Profile = () => {

    return(
        <>
        <div className="container py-4 d-flex justify-content-center">
        <div className="card col-md-6 mb-3">
  <div className="row g-0">
    <div className="col-md-4">
      <img src="https://placehold.co/600x400?text=User" className="img-fluid rounded-start" style={{ height: "100%", objectFit: "cover", borderRadius: "15px" }} />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h4 className="card-title">John Doe</h4>
        <p className="card-text">user@email.com</p>
        <p className="card-text">Contact: 33445566</p>
        <p className="card-text">Address: Street 4, NY</p>
      </div>
    </div>
  </div>
</div>
        </div>
        </>
    )
}

export default Profile