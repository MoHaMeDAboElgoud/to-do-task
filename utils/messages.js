const MESSAGES = {
    INTERNAL_SERVER_ERROR: 'حدث خطأ برجاء إبلاغ الدعم الفني|Internal server error. Please contact technical support',
    BAD_REQUEST_ERROR: 'غير صالح|Bad request',
    UNAUTHORIZED_ERROR: 'غير مصرح|Unauthorized',
    FORBIDDEN_ERROR: 'ممنوع|Forbidden',
    NOT_FOUND_ERROR: 'غير موجود| Not found',
    CONFLICT_ERROR: 'تعارض|Conflict',
    UNPROCESSABLE_ENTITY_ERROR: 'لا يمكن معالجة البيان|Unprocessable entity',
    RESPONSE_OK: 'تم تنفيذ العملية بنجاح|Success',
    UNPROCESSABLE_USERS: 'حدث خطأ أثناء معالجة المستخدمين|Error happened',
    REQUIRED_FIELDS: 'يجب إدخال البيانات المطلوبة|You should enter required fields',
    DUPLICATED_EMAIL: 'يوجد مستخدم بهذا البريد|There is a user with this email',
    PROVIDER_REQUIRED: 'يجب إدخال المورد|Provider Required',
    NOT_FOUND_USER: 'مستخدم غير موجود|Not found user',
    EMAIL_REQUIRED: 'البريد الإلكتروني مطلوب|Email is required field',
    NAME_REQUIRED: 'الإسم مطلوب|Name is required field',
    PASSWORD_REQUIRED: 'كلمة المرور مطلوب|Password is required field',
    USER_ID_REQUIRED: 'رقم معرف المستخدم مطلوب|User id is required field',
    CONTENT_REQUIRED: 'المحتوى مطلوب|Content is required field',
    MONGO_ID: 'يجب إدخال معرف مونجو سليم|you should enter valid mongo id',
    NOT_VALID_DATE_TIME: 'يجب إدخال تاريخ/وقت سليم|You should enter valid date/time',
    TO_DO_ID_REQUIRED: 'رقم معرف المهمة مطلوب|To do task id is required',
    NOT_FOUND_TODO: 'لا يوجد مهمة برقم المونجو المدخل|There is no to do task with entered id',
    DELETED: 'تم حذف المهمة|To do task deleted successfully'
};

module.exports = MESSAGES;