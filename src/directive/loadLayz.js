  
// 注意：Vue 自定义指令不直接使用 defineDirective，但我们可以封装一个函数来返回指令对象  
export const createLazyloadDirective =   {  
    // 当绑定元素插入到 DOM 中时...  
    mounted(el, binding) {  
      // ...（但通常我们不使用 beforeMount，因为 Vue 自定义指令没有这个钩子）  
      // 直接在类似 mounted 的上下文中编写逻辑  
      if (!binding.value) {  
        console.warn('v-lazyload needs a value for the src attribute');  
        return;  
      }  
  
      el.src = ''; // 初始时不显示图片  
      el.setAttribute('data-src', binding.value); // 存储真实的图片 URL  
  
      // 使用 Intersection Observer API  
      const observer = new IntersectionObserver((entries) => {  
        entries.forEach((entry) => {  
          if (entry.isIntersecting) {  
            el.src = el.getAttribute('data-src'); // 加载真实的图片  
            observer.unobserve(el); // 停止观察  
          }  
        });  
      }, {  
        rootMargin: '0px',  
        threshold: 0.1  
      });  
  
      // 存储 observer 引用以便稍后清理  
      el.__vueLazyloadObserver__ = observer; // 注意：这是一个非标准的属性，仅用于示例  
      observer.observe(el);  
    },  
  };  