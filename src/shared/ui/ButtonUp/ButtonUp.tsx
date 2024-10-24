import cls from './buttonUp.module.scss'

const ButtonUp = () => {
    return (

            <svg onClick={() => {window.scrollTo(0, 0);}} className={cls.scrollUp} width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path className={cls.scrollUpArr} opacity="0.9"
                          d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                          fill="none"></path>
                    <path className={cls.scrollUpBack}
                        d="M8.46967 12.9697C8.17678 13.2626 8.17678 13.7374 8.46967 14.0303C8.76256 14.3232 9.23744 14.3232 9.53033 14.0303L12 11.5607L14.4697 14.0303C14.7626 14.3232 15.2374 14.3232 15.5303 14.0303C15.8232 13.7374 15.8232 13.2626 15.5303 12.9697L12.5303 9.96967C12.2374 9.67678 11.7626 9.67678 11.4697 9.96967L8.46967 12.9697Z"
                        fill="none"></path>
                </g>
            </svg>


    );
};

export default ButtonUp;