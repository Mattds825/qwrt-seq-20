function updateValue(slider) {
    if (slider.id === 'vol-slider') document.getElementById('slider-value-vol').textContent = slider.value;
    if(slider.id === 'rev-slider') document.getElementById('slider-value-rev').textContent = slider.value;
    if(slider.id === 'dist-slider') document.getElementById('slider-value-dist').textContent = slider.value;
}