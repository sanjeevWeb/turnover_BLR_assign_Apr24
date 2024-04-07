// signup form fields
const namefield = document.querySelector('#namefield')
const emailfield = document.querySelector('#emailfield')
const passwordfield = document.querySelector('#passwordfield')
const loginhere = document.querySelector('a')

const signupForm = document.querySelector('#signupForm');

const baseUrl = 'https://turnover-blr-assign-apr24-9onp.vercel.app/api/v1';

// go to login page 
loginhere.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = './login.html'
})

// form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!namefield.value || !emailfield.value || !passwordfield.value) {
        alert('all fields are mandatory');
        // showToast('all fields are mandatory', null)
        return;
    }
    const obj = {
        username: namefield.value,
        email: emailfield.value,
        password: passwordfield.value
    };
    const response = await axios.post(`${baseUrl}/signup`, obj);
    if (response.data.error) {
        // showToast(response.data.error, null);
        alert(response.data.error);
        return
    }
    alert(response.data.msg)
    // showToast(null,response.data.message);
    window.location.href = './login.html'
})

function showToast(error,message) {
    let html = `<div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                    <div class="toast-body" style="${ error ? 'background-color: #DC3545;' : 'background-color: #2D8A45;'}">
                        ${ error ? error : message}
                    </div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>`;
    document.querySelector('#toastdiv').innerHTML += html
}
