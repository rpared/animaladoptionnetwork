import HeaderAdopters from "@/components/header-adopters";
import AdoptersDashboard from "@/components/adopters-dashboard";

export default function AdoptionRequests() {

  const ApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  //These variables have to be replaced with the actual shelter's coordinates fetched from the database
  const shelterLatitude = 43.668331;
  const shelterLongitude = -79.39060;
  const URI = "https://www.google.com/maps/embed/v1/place?key="+ ApiKey + "&q=" + shelterLatitude +","+ shelterLongitude;
  return (
    <>
      <HeaderAdopters />
      <AdoptersDashboard />
      <main className="bg-white my-2 text-gray-600 ">
        <div className="mx-auto max-w-[800px] relative isolate pt-6 px-8">
          <h1 className="text-4xl mb-4 font-semibold text-brown text-center">
            Adoption Requests
          </h1>
          <div className="container border border-gray-300 rounded-lg p-4">
 
          <b>Request for Animal Name 1</b>
          
          <p>Your request has been approved!</p>
          
          
          <p>replyMessage</p>
          <p>Shelter Name</p>
          <p>Shelter Email</p>
          <p>Shelter Address</p>
          <input name="checkbox" type="checkbox" />
          <label htmlFor="checkbox"> Mark as Read</label>
          <br />
          

          <div id="Shelter's Google Maps Location">
                    <iframe
            width="450"
            height="250"
            // frameBorder="0" style="border:0"
            referrerPolicy="no-referrer-when-downgrade"
            src={URI}
            allowFullScreen>
          </iframe>
          </div>
          <br />
          <button className="btn">Delete Button</button>
          </div>
          <div className="container border border-gray-300 rounded-lg p-4 mt-4">
 
        <b>Request for Animal Name 2</b>
        
        <p>Your request has been approved!</p>
        
        
        <p>replyMessage</p>
        <p>Shelter Name</p>
        <p>Shelter Email</p>
        <p>Shelter Address</p>
        <input name="checkbox" type="checkbox" />
        <label htmlFor="checkbox"> Mark as Read</label>
        <br />
        

        <div id="Shelter's Google Maps Location">
                  <iframe
          width="450"
          height="250"
          // frameBorder="0" style="border:0"
          referrerPolicy="no-referrer-when-downgrade"
          src={URI}
          allowFullScreen>
        </iframe>
        </div>
        <br />
        <button className="btn">Delete Button</button>
        </div>
        </div>
      </main>
    </>
  );
}
