import {Controller, useForm} from "react-hook-form";
import {IMaskInput} from "react-imask";
import cls from './contact.module.scss'
import {useState} from "react";
import {useTranslation} from "react-i18next";
import $api from "../../app/config/axios.ts";
import {useAuthStore} from "../../features/Auth/useAuthStore.ts";
import MyInput from "../../shared/ui/MyInput/MyInput.tsx";
import MyButton from "../../shared/ui/MyButton/MyButton.tsx";
import MyForm from "../../shared/ui/MyForm/MyForm.tsx";
import MyTextarea from "../../shared/ui/MyTextArea/MyTextarea.tsx";
import { useText} from "../../shared/hooks/useText/useText.ts";
import {useModal} from "../../shared/hooks/useModal/useModal.ts";
import ChangeTextForm from "../../features/Text/ChangeTextForm/ChangeTextForm.tsx";
import CreateTextForm from "../../features/Text/CreteTextForm/CreateTextForm.tsx";
import TooltipEdit from "../../shared/ui/Tooltips/TooltipEdit.tsx";
import TooltipCreate from "../../shared/ui/Tooltips/TooltipCreate.tsx";


interface IFormInput {
    name: string;
    phone: string;
    info: string;
}


const Contact = () => {
    const {reset, control, register, handleSubmit, clearErrors, formState: {errors}} = useForm<IFormInput>();
    const [onConfirmMessage, setOnConfirmMessage] = useState(false)
    const [resetKey, setResetKey] = useState(0)
    const {t} = useTranslation()
    const {isAuth} = useAuthStore(state => state)
    const {currentText, ruText, enText} = useText({type: 'contact'})
    const {

        closeModal,
        selectedContent,
        openTextCreateModal,
        openTextEditModal,
        isTextCreateForm,
        isTextEditForm,
        selectedContentObj,
        isKey
    } = useModal()

    const findItem = (item: string) => {
        const result =  currentText?.find(el => el.key === item )
        const id = result?.id
        return {text: result?.titleText, id: id}
    }

    const onSubmit = async (data: IFormInput) => {
        try {
            const response = await $api.post('/telegram/send_message', {
                name: data.name,
                phone: data.phone,
                message: data.info,
            }, {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response status:', response.status);
            if (response.status >= 200 && response.status < 300) {
                console.log('Message sent successfully!');
                setOnConfirmMessage(true)
                reset();
                clearErrors();
                setResetKey(prevKey => prevKey + 1)
                setTimeout(() => setOnConfirmMessage(false), 3000);

            } else {
                console.log('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            console.log('Error sending message.');
        }
    };

    return (
        <div className={cls.contact}>
            {isTextEditForm && <ChangeTextForm
                id={Number(selectedContent)}
                ruText={ruText}
                closeModal={closeModal}
                isModalOpen={isTextEditForm}
                engText={enText}
            />}
            {
                isTextCreateForm && <CreateTextForm
                    isModalOpen={isTextCreateForm}
                    closeModal={closeModal}
                    keyUniq={selectedContentObj.keyUniq}
                    type={selectedContentObj.type}
                    isKey={isKey}
                />
            }
            <div className={cls.contactLeft}>
                <div className={cls.conatcTT}>
                    {isAuth && <div className={cls.toolTips}>
                        {isAuth && currentText && findItem('head').id ?
                            <TooltipEdit text={`Изменить заголовок страницы`}
                                         onClick={() => openTextEditModal(String(findItem('head').id))}/>
                            :
                            <TooltipCreate text={'Создать заголовок'} onClick={() => openTextCreateModal({
                                type: 'contact',
                                keyUniq: 'head.title'
                            })}/>}
                    </div>}
                    <h1 className={cls.h}>{currentText ? findItem('head').text : ''}</h1>
                </div>
                <div className={cls.conatcTT}>
                    {isAuth && <div className={cls.toolTips}>
                        {currentText && findItem('description').id ?
                            <TooltipEdit text={`Изменить описание страницы`}
                                         onClick={() => openTextEditModal('description.title')}/>
                            :
                            <TooltipCreate text={'Создать описание'} onClick={() => openTextCreateModal({
                                type: 'contact',
                                keyUniq: 'description.title'
                            })}/>}
                    </div>}
                    <h3 className={cls.h3}>{currentText ? findItem('description').text : ''}</h3>

                </div>

                <div className={cls.conatcTT}>
                    {isAuth && <div className={cls.toolTips}>
                        {currentText && findItem('phone').id ?
                            <TooltipEdit text={`Изменить телефон`}
                                         onClick={() => openTextEditModal('phone.title')}/>
                            :
                            <TooltipCreate text={'Добавить телефон'} onClick={() => openTextCreateModal({
                                type: 'contact',
                                keyUniq: 'phone.title'
                            })}/>}
                    </div> }
                    <a href={`tel:${currentText ? findItem('phone') : ''}`} className={cls.phone}>{currentText ? findItem('phone').text : ''}</a>

                </div>
                <div className={cls.conatcTT}>
                    {isAuth && <div className={cls.toolTips}>
                        {currentText && findItem('email').id ?
                            <TooltipEdit text={`Изменить почту`}
                                         onClick={() => openTextEditModal('email.title')}/>
                            :
                            <TooltipCreate text={'Добавить почту'} onClick={() => openTextCreateModal({
                                type: 'contact',
                                keyUniq: 'email.title'
                            })}/>}
                    </div> }
                    <a href={`mailto:${currentText ? findItem('email').text : ''}`} className={cls.email}>
                        {currentText ? findItem('email').text : ''}
                    </a>

                </div>
                <div className={cls.conatcTT}>
                    {isAuth && <div className={cls.toolTips}>
                        {currentText && findItem('telegram').id ?
                            <TooltipEdit text={`Изменить телеграмм`}
                                         onClick={() => openTextEditModal('telegram.title')}/>
                            :
                            <TooltipCreate text={'Добавить телеграмм'} onClick={() => openTextCreateModal({
                                type: 'contact',
                                keyUniq: 'telegram.title'
                            })}/>}
                    </div> }
                    <div className={cls.email}>
                        <a href={`${currentText ? findItem('telegram').text : ''}`} target="_blank" rel="noopener noreferrer">
                            {currentText ? findItem('telegram').text : ''}
                        </a>
                    </div>

                </div>


            </div>
            <div className={cls.contactRight}>

                <MyForm  onSubmit={handleSubmit(onSubmit)}>
                    <div className={cls.conatcTT}>
                        {isAuth && <div className={cls.toolTips}>
                            {currentText && findItem('form').id ?
                                <TooltipEdit text={`Изменить заголовок формы`}
                                             onClick={() => openTextEditModal('form.title')}/>
                                :
                                <TooltipCreate text={'Добавить телефон'} onClick={() => openTextCreateModal({
                                    type: 'contact',
                                    keyUniq: 'form.title'
                                })}/>}
                        </div>}
                            <h3 className={cls.h3}>{currentText ? findItem('form').text : ''}</h3>
                    </div>

                    <div>
                        <MyInput

                            placeholder={t('Имя')}
                            type={'text'}
                            {...register('name', {
                                required: t('Имя обязательно для заполнения'),
                                pattern: {
                                    value: /^[a-zA-Zа-яА-ЯёЁ\s]+$/,
                                    message: t('Введите ваше имя без цифр и символов')
                                }
                            })}
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div>
                        <Controller
                            key={resetKey}
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: t('Телефон обязателен для заполнения'),
                                pattern: {
                                    value: /^\+7 \d{3}-\d{3}-\d{2}-\d{2}$/,
                                    message: t('Некорректный формат телефона')
                                }
                            }}
                            render={({field}) => (
                                <IMaskInput
                                    className={cls.inputPhone}
                                    placeholder={t("Телефон")}
                                    {...field}
                                    mask="+7 000-000-00-00"
                                    definitions={{'0': /[0-9]/}}
                                    onAccept={(value: string) => field.onChange(value)}
                                    overwrite
                                    ref={(ref: any) => {
                                        field.ref(ref ? ref.inputElement : null); // Устанавливаем ref
                                    }}

                                />
                            )}
                        />
                        {errors.phone && <p>{errors.phone.message}</p>}
                    </div>

                    <div>
                        <MyTextarea

                            placeholder={t("Дополнительная информация или пожелания")}
                            {...register('info')}
                        />
                    </div>
                    {onConfirmMessage && <div className={cls.confirm}>Ваше сообщение успешно отправлено </div>}
                    <MyButton
                        type="submit"
                    >
                        {t('Отправить')}
                    </MyButton>
                </MyForm>
            </div>
        </div>
    );
};

export default Contact;
