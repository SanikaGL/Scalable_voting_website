document.addEventListener("DOMContentLoaded", () => {
    preloadCandidates();
});
console.log("Frontend origin:", window.location.origin);
const socket = io();
async function preloadCandidates() {

    try {


        const res = await fetch("http://127.0.0.1:5000/admin-preload/preload-candidate", {
            method: "GET"
        });
        if (!res.ok) {
            const text = await res.text();
            alert(text);
            console.log("Error response:", text);
            return;
        }
        // credentials: "include"


        const candidates = await res.json();
        candidates.forEach(candidate => {
            createCandidateCard(candidate);
        });
        console.log("Status:", res.status);

        console.log(candidates);

    } catch (error) {
        console.log(error);
    }

}


const renderedCandidates = new Set();
socket.on("pending-candidate-event", (data) => {
    createCandidateCard(data);//candidate creation when new candiadte registers  using pub sub and web socket
})
socket.on("reject_candidate_event", (id) => {
    removecard(id);
}
)


function removecard(id) {
    const card = document.getElementById(id);
    if (card) {
        card.remove();
        renderedCandidates.delete(id);
    }
}
function createCandidateCard(candidate) {

    if (renderedCandidates.has(candidate._id)) {
        return;
    }

    renderedCandidates.add(candidate._id);

    const container = document.getElementById("candidateContainer");

    const card = document.createElement("div");
    card.className = "card";
    card.id = candidate._id;

    card.innerHTML = `
    <img src="${candidate.key}" />

    <div class="info">
        <div class="id">Name: ${candidate.name}</div>
        <p>${candidate.description}</p>
    </div>

    <div class="buttons">
        <button onclick="acceptCandidate('${candidate._id}')">Accept</button>
        <button onclick="rejectCandidate('${candidate._id}')">Reject</button>
    </div>
  `;

    container.prepend(card);
}
const acceptCandidate = async (candidate_id) => {//candidate accept api call
    const res = await fetch("http://127.0.0.1:5000/candidate-approval/accept", {
        // YOU FORGOT THIS
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            candidate_id: candidate_id
        })
    });
    const text = res.message;
    console.log(text);
    removecard(candidate_id);

}
const rejectCandidate = (candidate_id) => {//candidate reject button api call
    fetch("http://127.0.0.1:5000/candidate-approval/reject", {
        method: "POST",
        credentials: "include"

    }).then(response =>
        response.json()
    ).then();
    removecard(candidate_id);

}
const logout = async () => {//admin logout api call
    const logout = await fetch("http://127.0.0.1:5000/admin-logout/logout", {
        method: "POST"
    }.then(response => response.json()));


    alert("logged out successfully");
}
