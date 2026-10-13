<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'gemini' => [
        'api_key' => env('GEMINI_API_KEY'),
        'model' => env('GEMINI_MODEL', 'gemini-3-flash-preview'),
        'backup_model' => env('GEMINI_BACKUP_MODEL', 'gemini-3.1-flash-lite-preview'),
        'tertiary_model' => env('GEMINI_TERTIARY_MODEL', 'gemini-flash-latest'),
        'model_fast' => env('GEMINI_MODEL_FAST', 'gemini-3.1-flash-lite-preview'),
        'model_reasoning' => env('GEMINI_MODEL_REASONING', 'gemini-3-flash-preview'),
        'model_vision' => env('GEMINI_MODEL_VISION', 'gemini-2.5-flash-image'),
        'model_embedding' => env('GEMINI_MODEL_EMBEDDING', 'gemini-embedding-2'),
        'models' => array_values(array_filter(array_map('trim', explode(',', env('GEMINI_MODELS', 'gemini-3-flash-preview,gemini-3.1-flash-lite-preview,gemini-flash-latest,gemini-3.6-flash,gemini-3.5-flash'))))),
        'rpm_limit' => (int) env('GEMINI_RPM_LIMIT', 5),
        'rpd_limit' => (int) env('GEMINI_RPD_LIMIT', 20),
    ],

    'groq' => [
        'api_key' => env('GROQ_API_KEY'),
        'model' => env('GROQ_MODEL', 'openai/gpt-oss-120b'),
        'backup_model' => env('GROQ_BACKUP_MODEL', 'qwen/qwen3.8-27b'),
        'tertiary_model' => env('GROQ_TERTIARY_MODEL', 'openai/gpt-oss-20b'),
        'model_fast' => env('GROQ_MODEL_FAST', 'openai/gpt-oss-20b'),
        'model_reasoning' => env('GROQ_MODEL_REASONING', 'openai/gpt-oss-120b'),
        'model_audio' => env('GROQ_MODEL_AUDIO', 'whisper-large-v3-turbo'),
        'models' => array_values(array_filter(array_map('trim', explode(',', env('GROQ_MODELS', 'openai/gpt-oss-120b,qwen/qwen3.8-27b,openai/gpt-oss-20b,allam-2-7b'))))),
        'rpm_limit' => (int) env('GROQ_RPM_LIMIT', 30),
        'rpd_limit' => (int) env('GROQ_RPD_LIMIT', 1000),
    ],

    'cloudflare' => [
        'api_token' => env('CLOUDFLARE_API_TOKEN'),
        'account_id' => env('CLOUDFLARE_ACCOUNT_ID'),
        'model' => env('CLOUDFLARE_MODEL', '@cf/meta/llama-3.1-8b-instruct'),
        'backup_model' => env('CLOUDFLARE_BACKUP_MODEL', '@cf/meta/llama-3.3-70b-instruct'),
        'tertiary_model' => env('CLOUDFLARE_TERTIARY_MODEL', '@cf/mistral/mistral-7b-instruct-v0.2'),
        'model_fast' => env('CLOUDFLARE_MODEL_FAST', '@cf/meta/llama-3.1-8b-instruct'),
        'models' => array_values(array_filter(array_map('trim', explode(',', env('CLOUDFLARE_MODELS', '@cf/meta/llama-3.1-8b-instruct,@cf/meta/llama-3.3-70b-instruct,@cf/mistral/mistral-7b-instruct-v0.2,@cf/qwen/qwen1.5-14b-chat,@cf/meta/llama-3-8b-instruct'))))),
        'rpm_limit' => (int) env('CLOUDFLARE_RPM_LIMIT', 60),
        'rpd_limit' => (int) env('CLOUDFLARE_RPD_LIMIT', 1000),
    ],

    'midtrans' => [
        'merchant_id' => env('MIDTRANS_MERCHANT_ID', 'Mid-client-o8FP06N-oie4kS_V'),
        'client_key' => env('MIDTRANS_CLIENT_KEY', 'Mid-client-o8FP06N-oie4kS_V'),
        'server_key' => env('MIDTRANS_SERVER_KEY', 'Mid-server-CaLOeneUWptQF5Z4vrSr-td7'),
        'is_production' => filter_var(env('MIDTRANS_IS_PRODUCTION', false), FILTER_VALIDATE_BOOLEAN),
        'snap_url' => filter_var(env('MIDTRANS_IS_PRODUCTION', false), FILTER_VALIDATE_BOOLEAN)
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js',
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI', env('APP_URL') . '/auth/google/callback'),
    ],

];
