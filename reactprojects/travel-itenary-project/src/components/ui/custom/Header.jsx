import { Button } from '../button';

 export const Header=()=> {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <img src='/logo.svg' className='w-32 h-30'/>
        <div>
            <Button>Sign In </Button>
        </div>
    </div>
  )
}

export default Header;