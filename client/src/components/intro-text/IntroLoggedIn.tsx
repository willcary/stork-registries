import Accordion from 'react-bootstrap/Accordion'
import { IntroProps } from '../../assets/ts/types'
import { UserInfo } from '../../assets/ts/types'

export default function IntroLoggedIn({
  userInfo,
  setUserInfo,
  didUserLoad,
}: IntroProps) {
  const { user_id, baby_gender, address } = userInfo

  //================================== Handle EDIT function ==================================
  const handleEditUserInfo = async (
    event: React.FormEvent,
    userInfo: UserInfo
  ) => {
    // event.preventDefault
    console.log("I'm EDITING a user!")
    try {
      const response = await fetch(`/user_info/${user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      })
      window.location.href = '/'
    } catch (error: any) {
      console.error(error.message)
    }
  }

  //================================== Handle ADDITEM function ==================================
  const handleAddUserInfo = async (
    event: React.FormEvent,
    userInfo: UserInfo
  ) => {
    // event.preventDefault
    console.log("I'm ADDING a user!")
    try {
      const body = userInfo
      const response = await fetch('/user_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      window.location.href = '/'
    } catch (error: any) {
      console.error(error.message)
    }
  }

  //================================== HandleSubmit function ===============================
  const handleSubmit = (event: React.FormEvent) => {
    console.log("I'm submitting")
    return didUserLoad
      ? handleEditUserInfo(event, userInfo)
      : handleAddUserInfo(event, userInfo)
  }

  //================================== Handle userInfo CHANGE function ==================================
  const handleUserInfoChange: any = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setUserInfo((prev: UserInfo) => {
      return { ...prev, [name]: value }
    })
  }

  return (
    <>
      <p>
        Congratulations on the new member of your family! Add and edit items at
        your leisure.
      </p>
      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Edit profile info</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleSubmit}>
              <p>Know the gender of your new little one?</p>
              <div className='user-input-width m-auto mb-3'>
                <select
                  value={baby_gender}
                  name='baby_gender'
                  onChange={handleUserInfoChange}
                  className='form-select'
                  aria-label='Gender options'
                >
                  <option value='mystery'>Mystery</option>
                  <option value='girl'>Girl</option>
                  <option value='boy'>Boy</option>
                  <option value='girl-girl'>Two Girls</option>
                  <option value='boy-boy'>Two Boys</option>
                  <option value='girl-boy'>Girl and Boy</option>
                </select>
              </div>

              <label htmlFor='address' className='form-label'>
                Address to send items to:
              </label>
              <input
                type='text'
                name='address'
                className='form-control user-input-width m-auto mb-3'
                placeholder='Address'
                value={address}
                onChange={handleUserInfoChange}
                aria-label='Address'
                aria-describedby='Address to ship'
              />
              <input
                type='submit'
                value='Submit changes'
                className='btn btn-primary'
              />
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
